from collections import defaultdict
from math import atan2
from typing import Tuple, List

import numpy as np

from helpers.geometry import point_dist
from model.design_elements import Module, Tree, Obstruction, Setback, RoofPlane
from model.shapes import Circle, LineSegment, Polygon
from model.solar_design import SolarDesign

aurora_layers = {
    "roofs": ['Roofs', 'Buildings'],
    "setbacks": ['Setbacks'],
    "obstructions": ['Obstructions'],
    "trees": ['Trees'],
    "modules": ['Modules'],
}
all_known_layers = set(layer for layers in aurora_layers.values() for layer in layers)


def associate_panels_with_roofs(solar_design):
    """
    Assign to every panel, a roof to which it belongs.
    """
    if solar_design.roofs:
        for module in solar_design.modules:
            roofs_candidates = [roof for roof in solar_design.roofs if
                                roof.shape.shapely_polygon.contains(module.shape.shapely_polygon)]
            if roofs_candidates:
                # note: in case of nested roofs, where panel is contained by more than one roof
                #   we pick smaller one (nested one).
                roof = min(roofs_candidates, key=lambda x: x.shape.shapely_polygon.area)
                module.roof_id = roof.id


def compute_tilt_from_module(real_dimension, projected_dimension):
    return np.rad2deg(np.arccos(projected_dimension / real_dimension))


def compute_azimuth_from_longer_dimension(segment):
    """
    NOTE: This is an approximation. The azimuth computed this way can be rotated by 180 deg
    """
    point_a, point_b = segment
    x1, y1 = point_a[:2]
    x2, y2 = point_b[:2]
    azimuth = atan2(x2 - x1, y1 - y2)
    if azimuth < 0:
        azimuth += 2 * np.pi
    return np.rad2deg(azimuth)


def infer_tilt_azimuth(solar_design):
    """
    If we have a module spec defined we can try to infer tilt&(almost)azimuth of roof planes,
    using panels placed on those roofs.
    """
    if solar_design.module_spec is not None:
        longer_dimension = max(solar_design.module_spec.size[0], solar_design.module_spec.size[1])
        for roof in solar_design.roofs:
            modules_on_roof = [module for module in solar_design.modules if module.roof_id == roof.id]
            if modules_on_roof:
                modules_longer_segments = [(point_dist(*module.shape.longest_segment), module.shape.longest_segment) for
                                           module in modules_on_roof]
                # NOTE: in case we have mixed portrait&landscape panels, we pick the shortest longer segment,
                #       as it will belong to portrait one
                shortest_longer_segment = min(modules_longer_segments, key=lambda x: x[0])
                roof.tilt = compute_tilt_from_module(longer_dimension, shortest_longer_segment[0])
                roof.azimuth = compute_azimuth_from_longer_dimension(shortest_longer_segment[1])


def prepare_objects(solar_design):
    """
    Prepare objects: flatten to polygons, change units, etc.
    """
    associate_panels_with_roofs(solar_design)
    infer_tilt_azimuth(solar_design)


def construct_objects_from_shapes(shapes_per_layer):
    object_layers = {
        "roofs": RoofPlane,
        "setbacks": Setback,
        "obstructions": Obstruction,
        "trees": Tree,
        "modules": Module,
    }
    objects_per_layer = defaultdict(list)
    for layer_name, layer in shapes_per_layer.items():
        for shape in layer:
            objects_per_layer[layer_name].append(object_layers.get(layer_name)(shape=shape))
    return objects_per_layer


def parse_aurora_dxf(dxf_file, module_spec=None) -> Tuple[SolarDesign, List]:
    unknown_entities = []
    entities_per_layer = split_by_layer(dxf_file, unknown_entities)
    shapes_per_layer = construct_shapes_from_dxf_entities(entities_per_layer, unknown_entities)
    objects_per_layer = construct_objects_from_shapes(shapes_per_layer)
    solar_design = SolarDesign(layers=objects_per_layer, module_spec=module_spec)
    prepare_objects(solar_design)

    return solar_design, unknown_entities


def construct_shapes_from_dxf_entities(entities_per_layer, unknown_entities):
    objects_per_layer = {}
    for layer_name, entities in entities_per_layer.items():
        objects_per_layer[layer_name], unknown = assemble_lines(entities)
        unknown_entities.extend(unknown)
    return objects_per_layer


def split_by_layer(dxf_file, unknown_entities):
    entities_per_layer = defaultdict(list)
    for entity in dxf_file.entities:
        if entity.layer in all_known_layers:
            for layer_name, dxf_layers in aurora_layers.items():
                if entity.layer in dxf_layers:
                    entities_per_layer[layer_name].append(entity)
        else:
            unknown_entities.append(entity)
    return entities_per_layer


def assemble_lines(dxf_entities):
    """
    :param dxf_entities: a list of dxf entities resulting from dxfgrabber read
    :return: a list of dicts with complete visual objects, a list of unrecognized elements
    """
    design_objects = []
    unknown_entities = []
    shape = []
    for entity in dxf_entities:
        if entity.dxftype == "CIRCLE":
            design_objects.append(Circle(center=entity.center, radius=entity.radius))
            continue
        elif entity.dxftype != "LINE":
            unknown_entities.append(entity)
            continue
        if not shape:
            shape.append((entity.start, entity.end))
        elif entity.start == shape[-1][1] or entity.end == shape[-1][0]:
            shape.append((entity.start, entity.end))
        elif entity.start == shape[0][1] or entity.end == shape[0][0]:
            shape.insert(0, (entity.start, entity.end))
        else:
            line_segment = np.array(
                [x[0] for x in shape] + [shape[-1][1]])
            design_objects.append(LineSegment(points=line_segment))
            shape = [(entity.start, entity.end)]
        if len(shape) > 1 and (shape[0][0] == entity.end or shape[0][0] == entity.start):
            polygon = np.array([x[0] for x in shape])
            design_objects.append(Polygon(points=polygon))
            shape = []

    if shape:
        line_segment = np.array(
            [x[0] for x in shape] + [shape[-1][1]])
        design_objects.append(LineSegment(points=line_segment))

    return design_objects, unknown_entities
