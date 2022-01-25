from mappers.module_spec_mapper import ModuleSpecMapper
from model.module_spec import ModuleSpec


def test_module_spec_mapping():
    data = {"name": "X22-360-D-AC"}
    mapper_to_obj = ModuleSpecMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, ModuleSpec)
    assert outcome.name == data['name']

    mapper_to_data = ModuleSpecMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['name'] == data['name']
    assert retrieved_data['wattage'] == 360.

    mapper_to_obj = ModuleSpecMapper(data=retrieved_data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, ModuleSpec)
    assert outcome.name == data['name']