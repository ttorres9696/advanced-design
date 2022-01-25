import numpy as np
import pytest
from kim import Mapper, FieldInvalid
from kim.pipelines import Session

from mappers.numpy_points import NumpyPoints, check_if_valid_array_of_points, to_numpy_array, numpy_to_list


def test_marshaling_2d_array_of_points():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = [[2., 3.], [4., 5.], [6., 7.]]

    data = to_numpy_array(session)

    assert isinstance(data, np.ndarray)
    assert data.shape == (3, 2)


def test_marshaling_3d_array_of_points():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = [[2., 3., 4.], [6., 7., 8.], [9., 8., 7.], [1., 8., 9.]]

    data = to_numpy_array(session)

    assert isinstance(data, np.ndarray)
    assert data.shape == (4, 3)


def test_marshaling_point():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = [2., 3., 4.]

    data = to_numpy_array(session)

    assert isinstance(data, np.ndarray)
    assert data.shape == (3,)


def test_validation_valid_shapes():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    # given a 3d point
    session.data = [2., 3., 4.]
    # then it is valid
    data = check_if_valid_array_of_points(session)
    assert data is not None

    # given array of 3d points
    session.data = [[2., 3., 4.], [5., 6., 7.]]
    # then it is valid
    data = check_if_valid_array_of_points(session)
    assert data is not None

    # given array of 2d points
    session.data = [[2., 3.], [3., 4.], [5., 6.], [7., 8.]]
    # then it is valid
    data = check_if_valid_array_of_points(session)
    assert data is not None


def test_validation_invalid_data():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    # given a 3d array
    session.data = [[[2., 3.], [4., 5.]], [[8., 1.], [7., 9.]]]
    with pytest.raises(FieldInvalid):
        check_if_valid_array_of_points(session)
    # given an unaligned array (2d&3d mix)
    session.data = [[2., 3.], [4., 5., 6.]]
    with pytest.raises(FieldInvalid):
        check_if_valid_array_of_points(session)
    # given an array of 4d points
    session.data = [[2., 3., 4., 5.], [4., 5., 6., 7.]]
    with pytest.raises(FieldInvalid):
        check_if_valid_array_of_points(session)
    # given a 1d point
    session.data = [2.]
    with pytest.raises(FieldInvalid):
        check_if_valid_array_of_points(session)


def test_serialization_2d_array_of_points():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = np.array([[2., 3.], [4., 5.], [6., 7.]], dtype=np.float32)

    data = numpy_to_list(session)

    assert isinstance(data, list)
    assert len(data) == 3
    assert all(len(p) == 2 for p in data)


def test_serialization_3d_array_of_points():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = np.array([[2., 3., 4.], [6., 7., 8.], [9., 8., 7.], [1., 8., 9.]], dtype=np.float32)

    data = numpy_to_list(session)

    assert isinstance(data, list)
    assert len(data) == 4
    assert all(len(p) == 3 for p in data)


def test_serialization_point():
    session = Session()
    session.field = NumpyPoints(dtype=np.float32, name="test_field")
    session.data = np.array([2., 3., 4.], dtype=np.float32)

    data = numpy_to_list(session)

    assert isinstance(data, list)
    assert len(data) == 3


class TestObject:
    pass


class TestMapperNumpyField(Mapper):
    __type__ = TestObject
    test_field = NumpyPoints(dtype=np.float32)


def test_numpy_points_field():
    data = {"test_field": [[1., 2.], [3., 4.], [5., -6.], [7., 8.]]}
    mapper_to_obj = TestMapperNumpyField(data=data)
    obj = mapper_to_obj.marshal()
    assert isinstance(obj.test_field, np.ndarray)
    assert obj.test_field.shape == (4, 2)

    mapper_to_data = TestMapperNumpyField(obj=obj)
    data_retrieved = mapper_to_data.serialize()
    assert data == data_retrieved
