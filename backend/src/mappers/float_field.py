from kim.field import Float
from kim.pipelines import FloatSerializePipeline, coerce_to_float, SerializePipeline


class NonStrFloatSerializationPipeline(FloatSerializePipeline):
    """
    A pipeline not using strings to represent floats
    """
    process_pipes = [coerce_to_float] + SerializePipeline.process_pipes


class NonStrFloat(Float):
    """
    A float field that is not serialized as a string
    """
    serialize_pipeline = NonStrFloatSerializationPipeline
