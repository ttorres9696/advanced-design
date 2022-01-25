import numpy as np

from helpers.geometry import point_dist
from model.shapes import Circle, find_longest_segment


def test_circle_shape():
    circle = Circle(center=[1., 2.], radius=1.)
    assert np.isclose(circle.shapely_polygon.area, np.pi, atol=0.01)


def test_find_longest_segment_closed():
    points = np.array([[1., 1.], [10., 1.], [10., 3.], [1., 3.]])
    longest_segment = find_longest_segment(points, is_closed=True)

    # the answer should be one of [1. , 1.], [10., 1.] or [10., 3.], [1., 3.]
    assert np.isclose(point_dist(*longest_segment), 9., atol=0.1)


def test_find_longest_segment_open():
    points = np.array([[1., 1.], [10., 1.], [10., 3.]])
    longest_segment = find_longest_segment(points, is_closed=False)

    # the answer should be [1. , 1.], [10., 1.]
    assert np.isclose(point_dist(*longest_segment), 9., atol=0.1)
    assert (longest_segment[0] == points[0]).all()
    assert (longest_segment[1] == points[1]).all()
