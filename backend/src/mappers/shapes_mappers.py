import numpy as np
from kim import String, PolymorphicMapper

from mappers.float_field import NonStrFloat
from mappers.numpy_points import NumpyPoints
from model.shapes import Polygon, Shape, Circle, LineSegment


class ShapeMapper(PolymorphicMapper):
    __type__ = Shape

    type = String(choices=['polygon', 'line_segment', 'circle'])

    __mapper_args__ = {
        'polymorphic_on': type,
        'allow_polymorphic_marshal': True,
    }


class PolygonMapper(ShapeMapper):
    __type__ = Polygon
    points = NumpyPoints(dtype=np.float32)

    __mapper_args__ = {
        'polymorphic_name': 'polygon',
    }


class LineSegmentMapper(ShapeMapper):
    __type__ = LineSegment
    points = NumpyPoints(dtype=np.float32)

    __mapper_args__ = {
        'polymorphic_name': 'line_segment',
    }


class CircleMapper(ShapeMapper):
    __type__ = Circle

    radius = NonStrFloat()
    center = NumpyPoints(dtype=np.float32)

    __mapper_args__ = {
        'polymorphic_name': 'circle',
    }
