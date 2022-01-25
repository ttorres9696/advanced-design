import itertools


class DesignElement:
    _id_gen = itertools.count()
    _id_pattern = "E{id}"
    _type_name = None

    def __init__(self, element_id=None, shape=None):
        if element_id is not None:
            self.id = element_id
        else:
            self.id = self._id_pattern.format(id=next(DesignElement._id_gen))
        self.shape = shape
        self.type = self._type_name


class RoofPlane(DesignElement):
    _id_pattern = "R{id}"
    _type_name = "roof_plane"

    def __init__(self, element_id=None, shape=None):
        super().__init__(element_id, shape)
        self.azimuth = 0.
        self.tilt = 0.


class Module(DesignElement):
    _id_pattern = "M{id}"
    _type_name = "module"

    def __init__(self, element_id=None, shape=None):
        super().__init__(element_id, shape)
        self.roof_id = None


class Setback(DesignElement):
    _id_pattern = "S{id}"
    _type_name = "setback"

    def __init__(self, element_id=None, shape=None):
        super().__init__(element_id, shape)


class Obstruction(DesignElement):
    _id_pattern = "O{id}"
    _type_name = "obstruction"

    def __init__(self, element_id=None, shape=None):
        super().__init__(element_id, shape)


class Tree(DesignElement):
    _id_pattern = "T{id}"
    _type_name = "tree"

    def __init__(self, element_id=None, shape=None):
        super().__init__(element_id, shape)
