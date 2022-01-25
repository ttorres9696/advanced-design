from model.module_spec import ModuleSpec


def test_module_spec_can_be_retrieved_by_name():
    name = 'X22-360-D-AC'
    spec = ModuleSpec(name=name)

    assert spec.name == name
    assert spec.wattage == 360


def test_module_spec_fallback_to_default():
    name = "not-module"

    spec = ModuleSpec(name=name)
    assert spec.name != name
    assert spec.name == 'X22-370-D-AC'  # default


def test_module_spec_to_dict():
    name = "X22-360-D-AC"

    spec = ModuleSpec(name=name)
    assert spec.name == name
    assert all(a == b for a, b in zip(['name', 'size', 'spacing', 'wattage'], spec.to_dict().keys()))