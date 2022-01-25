from collections import defaultdict


class SolarDesign:
    """
    A class holding whole solar design, including obstruction, etc.
    """
    def __init__(self, layers=None, module_spec=None):
        self.layers = defaultdict(list)
        if layers:
            self.layers.update(layers)
        self.module_spec = module_spec

    @property
    def roofs(self):
        return self.layers['roofs']

    @property
    def modules(self):
        return self.layers['modules']
