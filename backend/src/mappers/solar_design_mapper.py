from kim import Mapper, field, MappingInvalid

from mappers.design_element_mapper import DesignElementMapper
from mappers.module_spec_mapper import ModuleSpecMapper
from model.solar_design import SolarDesign


class LayersMapper(Mapper):
    __type__ = dict

    roofs = field.Collection(field.Nested(DesignElementMapper, allow_create=True), required=True)
    modules = field.Collection(field.Nested(DesignElementMapper, allow_create=True), required=True)
    trees = field.Collection(field.Nested(DesignElementMapper, allow_create=True), required=False,
                             null_default=[], default=[])
    setbacks = field.Collection(field.Nested(DesignElementMapper, allow_create=True), required=False,
                                null_default=[], default=[])
    obstructions = field.Collection(field.Nested(DesignElementMapper, allow_create=True), required=False,
                                    null_default=[], default=[])


class SolarDesignMapper(Mapper):
    __type__ = SolarDesign

    layers = field.Nested(LayersMapper, allow_create=True)
    module_spec = field.Nested(ModuleSpecMapper, allow_create=True, required=False)

    def validate(self, output):
        super().validate(output)
        self.validated_each_module_is_associated_with_valid_roof(output)

    @staticmethod
    def validated_each_module_is_associated_with_valid_roof(output):
        roofs_ids = [roof.id for roof in output.roofs]
        if not all(module.roof_id in roofs_ids for module in output.modules):
            raise MappingInvalid(errors=["A module was associated with non-existing roof."])
