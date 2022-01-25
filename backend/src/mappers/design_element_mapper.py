from kim import PolymorphicMapper, String, field

from mappers.float_field import NonStrFloat
from mappers.shapes_mappers import ShapeMapper
from model.design_elements import DesignElement, RoofPlane, Module, Setback, Tree, Obstruction


class DesignElementMapper(PolymorphicMapper):
    __type__ = DesignElement

    type = String(choices=['roof_plane', 'module', 'setback', 'tree', 'obstruction'])
    id = String()
    shape = field.Nested(ShapeMapper, allow_create=True)

    __mapper_args__ = {
        'polymorphic_on': type,
        'allow_polymorphic_marshal': True,
    }


class RoofPlaneMapper(DesignElementMapper):
    __type__ = RoofPlane

    tilt = NonStrFloat()
    azimuth = NonStrFloat()

    __mapper_args__ = {
        'polymorphic_name': 'roof_plane',
    }


class ModuleMapper(DesignElementMapper):
    __type__ = Module

    roof_id = String()

    __mapper_args__ = {
        'polymorphic_name': 'module',
    }


class SetbackMapper(DesignElementMapper):
    __type__ = Setback

    __mapper_args__ = {
        'polymorphic_name': 'setback',
    }


class TreeMapper(DesignElementMapper):
    __type__ = Tree

    __mapper_args__ = {
        'polymorphic_name': 'tree',
    }


class ObstructionMapper(DesignElementMapper):
    __type__ = Obstruction

    __mapper_args__ = {
        'polymorphic_name': 'obstruction',
    }
