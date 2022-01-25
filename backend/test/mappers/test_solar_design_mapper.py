import pytest
from kim import MappingInvalid, MapperError

from mappers.solar_design_mapper import SolarDesignMapper
from model.module_spec import ModuleSpec
from model.solar_design import SolarDesign


def test_marshaling_solar_design():
    data = {
        "layers": {
            "roofs": [
                {
                    'id': "R1",
                    'shape': {
                        "type": "polygon",
                        "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
                    },
                    'type': "roof_plane",
                    "tilt": 0.0,
                    "azimuth": 0.0,
                }],
            "modules": [
                {
                    'id': "M1",
                    'shape': {
                        "type": "polygon",
                        "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
                    },
                    'type': "module",
                    "roof_id": "R1"
                }],
            "trees": [],
            "setbacks": [],
            "obstructions": [{
                'id': "O1",
                'shape': {
                    "type": "circle",
                    "radius": 1.,
                    "center": [1., 2.]
                },
                'type': "obstruction",
            }]
        }
    }
    mapper_to_obj = SolarDesignMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, SolarDesign)
    mapper_to_data = SolarDesignMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert len(retrieved_data['layers']['modules']) == 1
    assert len(retrieved_data['layers']['roofs']) == 1


def test_validation_panels_should_belong_to_existing_roofs():
    invalid_data = {
        "layers": {
            "roofs": [
                {
                    'id': "R1",
                    'shape': {
                        "type": "polygon",
                        "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
                    },
                    'type': "roof_plane",
                    "tilt": 0.0,
                    "azimuth": 0.0,
                }],
            "modules": [
                {
                    'id': "M1",
                    'shape': {
                        "type": "polygon",
                        "points": [[12.2, 23.3], [233.5, 34.4], [-0.1, 0.2]],
                    },
                    'type': "module",
                    "roof_id": "R2"
                }]
        }
    }
    mapper_to_obj = SolarDesignMapper(data=invalid_data)
    with pytest.raises(MappingInvalid):
        mapper_to_obj.marshal()


def test_marshaling_solar_design_with_module_spec():
    data = {
        "layers": {
            "roofs": [],
            "modules": [],
        },
        "module_spec": {
            "name": "X22-360-D-AC"
        }
    }
    mapper_to_obj = SolarDesignMapper(data=data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, SolarDesign)
    assert isinstance(outcome.module_spec, ModuleSpec)
    mapper_to_data = SolarDesignMapper(obj=outcome)
    retrieved_data = mapper_to_data.serialize()
    assert retrieved_data['module_spec'].get('size')
    assert retrieved_data['module_spec'].get('spacing')
    assert retrieved_data['module_spec'].get('wattage')
    mapper_to_obj = SolarDesignMapper(data=retrieved_data)
    outcome = mapper_to_obj.marshal()
    assert isinstance(outcome, SolarDesign)
    assert isinstance(outcome.module_spec, ModuleSpec)


def test_marshaling_solar_design_with_errors():
    data = {
        'layers': {
            "roofs": [
                {
                    "type": "wrong_type_no_shape"
                },
            ]
        }
    }
    mapper_to_obj = SolarDesignMapper(data=data)
    with pytest.raises(MapperError):
        mapper_to_obj.marshal()

    data = {
        'layers': {
            "roofs": [
                {
                    "id": "R1",
                    "azimuth": "NE",
                    "tilt": 1.2,
                    "type": "roof_plane",
                    "shape": {
                        "type": "polygon",
                        "points": [[1., 2.], [2., 3.], [3., 5]]
                    }
                }
            ]
        }
    }
    mapper_to_obj = SolarDesignMapper(data=data)
    with pytest.raises(MappingInvalid) as e:
        mapper_to_obj.marshal()
