import logging
from collections import namedtuple
from typing import Tuple

logger = logging.getLogger(__name__)

ModuleSpecValue = namedtuple("ModuleSpecValue", ['name', 'series', 'spacing', 'size', 'wattage'])

meters_to_feet_factor = 3.2808
_modules_specs = [
    ModuleSpecValue('A400-G-AC', 'A', (0.0254 * meters_to_feet_factor, 0.0127 * meters_to_feet_factor),
                    (0.9906 * meters_to_feet_factor, 1.835 * meters_to_feet_factor), 400),
    ModuleSpecValue('X22-360-D-AC', 'X', (0.0254 * meters_to_feet_factor, 0.0127 * meters_to_feet_factor),
                    (1.0206 * meters_to_feet_factor, 1.558 * meters_to_feet_factor), 360),
    ModuleSpecValue('X22-370-D-AC', 'X', (0.0254 * meters_to_feet_factor, 0.0127 * meters_to_feet_factor),
                    (1.0206 * meters_to_feet_factor, 1.558 * meters_to_feet_factor), 370),
]
_default_module_spec = _modules_specs[-1]


def get_available_modules():
    return [ModuleSpec.from_spec_value(spec) for spec in _modules_specs]


class ModuleSpec:
    def __init__(self, name=None):
        self._name = name
        self._spec = None

    @classmethod
    def from_spec_value(cls, spec):
        module_spec = cls(spec.name)
        module_spec._spec = spec
        return module_spec

    @property
    def spec(self) -> ModuleSpecValue:
        if self._spec is None:
            self._spec = self._find_spec(self._name)
        return self._spec

    @property
    def name(self) -> str:
        return self.spec.name

    @name.setter
    def name(self, value):
        self._name = value
        self._spec = None

    @property
    def size(self) -> Tuple[float, float]:
        """
        :return: module size in feet
        """
        return self.spec.size

    @property
    def spacing(self) -> Tuple[float, float]:
        """
        :return: spacing between modules in feet
        """
        return self.spec.spacing

    @property
    def wattage(self) -> float:
        return self.spec.wattage

    @staticmethod
    def _find_spec(name):
        """
        Find module specification; currently just by name, but potentially there are more params in future
        """
        try:
            spec = next(spec for spec in _modules_specs if spec.name == name)
        except StopIteration:
            logger.warning(f"Module specification was not found by it's name for {name}. Using default")
            spec = _default_module_spec
        return spec

    def to_dict(self):
        attrs = ['name', 'size', 'spacing', 'wattage']
        return {key: getattr(self, key) for key in attrs}
