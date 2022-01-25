from kim import Mapper, field

from mappers.float_field import NonStrFloat
from model.module_spec import ModuleSpec


class ModuleSpecMapper(Mapper):
    __type__ = ModuleSpec

    name = field.String()

    size = field.Collection(NonStrFloat(), read_only=True)
    spacing = field.Collection(NonStrFloat(), read_only=True)
    wattage = NonStrFloat(read_only=True)
