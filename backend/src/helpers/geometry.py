import numpy as np


def point_dist_sq(point_a, point_b):
    return ((point_a - point_b) ** 2).sum()


def point_dist(point_a, point_b):
    return np.sqrt(point_dist_sq(point_a, point_b))
