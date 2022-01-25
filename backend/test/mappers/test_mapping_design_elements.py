import numpy as np

from mappers.design_element_mapper import DesignElementMapper
from mappers.shapes_mappers import ShapeMapper
from model.design_elements import DesignElement, RoofPlane, Module, Setback, Obstruction, Tree
from model.shapes import Shape, Polygon, LineSegment, Circle


def test_marshaling_serializing_roof():
    data = {
        'id': "R1",
        'shape': {
            "type": "polygon",
            "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        },
        'type': "roof_plane",
        "tilt": 0.0,
        "azimuth": 0.0,
    }
    mapper_to_obj = DesignElementMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, DesignElement)
    assert isinstance(outcome, RoofPlane)
    mapper_to_data = DesignElementMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert retrieved_data['id'] == data['id']
    assert retrieved_data['tilt'] == data['tilt']
    assert retrieved_data['azimuth'] == data['azimuth']
    assert 'shape' in retrieved_data  # shapes' serialization is checked separately


def test_marshaling_serializing_module():
    data = {
        'id': "M1",
        'shape': {
            "type": "polygon",
            "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        },
        'type': "module",
        "roof_id": "R1",
    }
    mapper_to_obj = DesignElementMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, DesignElement)
    assert isinstance(outcome, Module)
    mapper_to_data = DesignElementMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert retrieved_data['id'] == data['id']
    assert retrieved_data['roof_id'] == data['roof_id']
    assert 'shape' in retrieved_data  # shapes' serialization is checked separately


def test_marshaling_serializing_setback():
    data = {
        'id': "M1",
        'shape': {
            "type": "polygon",
            "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        },
        'type': "setback",
    }
    mapper_to_obj = DesignElementMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, DesignElement)
    assert isinstance(outcome, Setback)
    mapper_to_data = DesignElementMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert retrieved_data['id'] == data['id']
    assert 'shape' in retrieved_data  # shapes' serialization is checked separately


def test_marshaling_serializing_obstruction():
    data = {
        'id': "M1",
        'shape': {
            "type": "polygon",
            "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        },
        'type': "obstruction",
    }
    mapper_to_obj = DesignElementMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, DesignElement)
    assert isinstance(outcome, Obstruction)
    mapper_to_data = DesignElementMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert retrieved_data['id'] == data['id']
    assert 'shape' in retrieved_data  # shapes' serialization is checked separately


def test_marshaling_serializing_tree():
    data = {
        'id': "M1",
        'shape': {
            "type": "polygon",
            "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        },
        'type': "tree",
    }
    mapper_to_obj = DesignElementMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, DesignElement)
    assert isinstance(outcome, Tree)
    mapper_to_data = DesignElementMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert retrieved_data['id'] == data['id']
    assert 'shape' in retrieved_data  # shapes' serialization is checked separately
