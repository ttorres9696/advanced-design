import numpy as np
from kim import pipe, Field
from kim.pipelines import MarshalPipeline, SerializePipeline


@pipe()
def to_numpy_array(session):
    """
    Converts list (of lists) to numpy array
    """
    if session.data is not None:
        session.data = np.array(session.data, dtype=session.field.dtype or np.float32)
    return session.data


@pipe()
def check_if_valid_array_of_points(session):
    """
    :param session: session is object for passing data in parsing pipeline
    :return: if array is valid. It needs to be: a 2D array of 2D or 3D points, or a single 2D or 3D point
    """
    if session.data is not None:
        try:
            array = np.array(session.data, dtype=session.field.dtype or np.float32)
        except ValueError:
            raise session.field.invalid("out_of_bounds")
        if array.ndim not in [1, 2]:
            raise session.field.invalid("out_of_bounds")
        if array.ndim == 2 and array.shape[1] not in [2, 3]:
            raise session.field.invalid("out_of_bounds")
        if array.ndim == 1 and array.shape[0] not in [2, 3]:
            raise session.field.invalid("out_of_bounds")
    return session.data


class NumpyPointsMarshalPipeline(MarshalPipeline):
    process_pipes = MarshalPipeline.process_pipes + [to_numpy_array]
    validation_pipes = MarshalPipeline.validation_pipes + [check_if_valid_array_of_points]


@pipe()
def numpy_to_list(session):
    """
    Converts numpy array to list of lists
    """
    if session.data is not None:
        session.data = session.data.tolist()
    return session.data


class NumpyPointsSerializePipeline(SerializePipeline):
    process_pipes = SerializePipeline.process_pipes + [numpy_to_list]


class NumpyPoints(Field):
    """
    A serialization field definition. It maps lists with numpy arrays.
    The points needs to be either 2D or 3D.
    There might be just a single point on the list (then it is a single dimension array).
    """
    serialize_pipeline = NumpyPointsSerializePipeline
    marshal_pipeline = NumpyPointsMarshalPipeline

    def __init__(self, dtype, *args, **field_opts):
        """
        :param dtype: enforced numpy array dtype
        :param args: remaining Field args
        :param field_opts: remaining Field kwargs
        """
        super().__init__(*args, **field_opts)
        self.dtype = dtype
