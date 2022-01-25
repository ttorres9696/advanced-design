import numpy as np
import pytest

import dxfgrabber

from dxf.aurora_import import parse_aurora_dxf, infer_tilt_azimuth
from model.design_elements import Module, RoofPlane
from model.module_spec import ModuleSpec
from model.shapes import Shape, Polygon
from model.solar_design import SolarDesign


@pytest.mark.parametrize('case', ['dxfs/12roofs.dxf',
                                  'dxfs/tall.dxf',
                                  'dxfs/design_with_nested_roofs.dxf',
                                  'dxfs/many-roofs.dxf',
                                  'dxfs/sample.dxf', ])
def test_importing_reference_aurora_dxfs(case):
    # given a reference dxf file
    dxf = dxfgrabber.readfile(case)

    # when we parse it
    solar_design, unknown_entities = parse_aurora_dxf(dxf)

    # then we expect modules are always there
    assert len(solar_design.modules) > 0
    # then we expect at least one non-empty layer to be found except Modules
    assert any(len(layer) > 0 for name, layer in solar_design.layers.items() if name != "modules")
    # then we expect no entities at layers of unknown origin, or with unknown type
    assert len(unknown_entities) == 0


@pytest.mark.parametrize('case', ['dxfs/12roofs.dxf',
                                  'dxfs/tall.dxf',
                                  'dxfs/design_with_nested_roofs.dxf',
                                  'dxfs/many-roofs.dxf',
                                  'dxfs/sample.dxf', ])
def test_every_element_has_a_unique_id(case):
    # given a reference dxf file
    dxf = dxfgrabber.readfile(case)
    # when we parse it
    solar_design, _ = parse_aurora_dxf(dxf)

    # then every object should have an id
    all_objects_flat = [design_object for layer in solar_design.layers.values() for design_object in layer]
    assert all(design_object.id is not None for design_object in all_objects_flat)

    # and all ids are unique
    all_ids = set(design_object.id for design_object in all_objects_flat)
    assert len(all_ids) == len(all_objects_flat)


@pytest.mark.parametrize('case', ['dxfs/12roofs.dxf',
                                  'dxfs/tall.dxf',
                                  'dxfs/design_with_nested_roofs.dxf',
                                  'dxfs/many-roofs.dxf',
                                  'dxfs/sample.dxf', ])
def test_every_panel_belong_to_a_roof(case):
    # given a reference dxf file
    dxf = dxfgrabber.readfile(case)
    # when we parse it
    solar_design, _ = parse_aurora_dxf(dxf)

    # then all panels needs to have a valid reference id of a roof
    modules = [module for module in solar_design.modules]
    roofs_ids = set(roof.id for roof in solar_design.roofs)
    assert all(module.roof_id in roofs_ids for module in modules)


def test_tilt_azimuth_inference():
    # given some design loaded from DXF
    solar_design = SolarDesign()
    solar_design.modules.append(Module(element_id="M1", shape=Polygon(
        points=np.array([[58.8021, 23.3586], [58.8777, 19.9276], [54.0548, 19.8214], [53.9792, 23.2524]],
                        dtype=np.float32))))
    solar_design.roofs.append(RoofPlane(element_id="R1", shape=Polygon(
        points=np.array([[-14.1551, 35.1964], [69.2452, 38.7646], [69.7563, 15.5584]], dtype=np.float32))))
    solar_design.roofs.append(RoofPlane(element_id="R2", shape=Polygon(
        points=np.array([[-14.1551, 35.1964], [69.2452, 38.7646], [69.7563, 15.5584]], dtype=np.float32))))
    solar_design.modules[0].roof_id = 'R1'
    solar_design.module_spec = ModuleSpec('X22-370-D-AC')

    # when trying to deduce tilt&azimuth
    infer_tilt_azimuth(solar_design)

    # then we expect tilt and azimuth for roofs with panels
    assert solar_design.roofs[0].tilt != 0.
    assert solar_design.roofs[0].azimuth != 0.

    # and no knowledge for roofs without panels
    assert solar_design.roofs[1].tilt == 0.
    assert solar_design.roofs[1].azimuth == 0.
