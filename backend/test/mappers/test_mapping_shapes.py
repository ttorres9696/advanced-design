import numpy as np

from mappers.shapes_mappers import ShapeMapper
from model.shapes import Shape, Polygon, LineSegment, Circle


def test_marshaling_serializing_polygon():
    data = {
        'points': [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        'type': "polygon",
    }
    mapper_to_obj = ShapeMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, Shape)
    assert isinstance(outcome, Polygon)
    mapper_to_data = ShapeMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert np.allclose(retrieved_data['points'], data['points'])


def test_marshaling_serializing_line_segment():
    data = {
        'points': [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
        'type': "line_segment",
    }
    mapper_to_obj = ShapeMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, Shape)
    assert isinstance(outcome, LineSegment)
    mapper_to_data = ShapeMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert np.allclose(retrieved_data['points'], data['points'])


def test_marshaling_serializing_circle():
    data = {
        'center': [12.2, 23.3, 34.2],
        'radius': 2.3,
        'type': "circle",
    }
    mapper_to_obj = ShapeMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, Shape)
    assert isinstance(outcome, Circle)
    mapper_to_data = ShapeMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['type'] == data['type']
    assert np.allclose(retrieved_data['center'], data['center'])
    assert retrieved_data['radius'] == data['radius']
