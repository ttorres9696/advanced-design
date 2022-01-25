import numpy as np
from shapely.geometry import Polygon as ShapelyPolygon, Point

from helpers.geometry import point_dist_sq


class Shape:
    def __init__(self, shape_type=None):
        self.type = shape_type

    @property
    def shapely_polygon(self):
        raise NotImplementedError

    @property
    def longest_segment(self):
        raise NotImplementedError


class Polygon(Shape):
    def __init__(self, points=None):
        super().__init__(shape_type='polygon')
        self.points = points

    @property
    def shapely_polygon(self):
        return ShapelyPolygon(self.points)

    @property
    def longest_segment(self):
        return find_longest_segment(self.points, is_closed=True)


class LineSegment(Shape):
    def __init__(self, points=None):
        super().__init__(shape_type='line_segment')
        self.points = points

    @property
    def shapely_polygon(self):
        return ShapelyPolygon(self.points)

    @property
    def longest_segment(self):
        return find_longest_segment(self.points, is_closed=False)


class Circle(Shape):
    def __init__(self, center=None, radius=None):
        super().__init__(shape_type='circle')
        self.center = np.array(center, dtype=np.float32) if center else None
        self.radius = radius

    @property
    def shapely_polygon(self):
        return Point(self.center).buffer(self.radius)

    @property
    def longest_segment(self):
        return None


def find_longest_segment(points: np.ndarray, is_closed: bool):
    if points is None or not points.any():
        return None
    points = [point for point in points]
    points = points if not is_closed else points + [points[0]]
    pairs = zip(points, points[1:])
    return max(((point_dist_sq(point_a, point_b), (point_a, point_b)) for point_a, point_b in pairs),
               key=lambda x: x[0])[1]
