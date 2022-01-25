import pytest
from flask import url_for

from server import server


class TestSaveDesign:
    @classmethod
    def setup_class(cls):
        with server.test_client() as c:
            with server.app_context(), server.test_request_context():
                cls.path = url_for('design.save')
                cls.dxf_import = url_for('dxf_import.import_aurora_dxf')

    def test_wrong_method(self):
        with server.test_client() as c:
            response = c.get(self.path)
            assert response.status_code == 405

    def test_no_content(self):
        data = {}
        with server.test_client() as c:
            response = c.post(self.path, json=data, follow_redirects=True, )
            assert response.status_code == 400
            assert "Could not read content of request" in response.json['errors']

    def test_bad_mappings(self):
        data = {
            'layers': {
                "roofs": [
                    {
                        "type": "wrong_type_no_shape"
                    },
                    {
                        "id": "R1",
                        "type": "roof_plane",
                        "shape": {
                            "type": "polygon",
                            "points": [[1., 2.], [2., 3.], [3., 5]]
                        }
                    }
                ]
            }
        }
        with server.test_client() as c:
            response = c.post(self.path, json=data, follow_redirects=True, )
            assert response.status_code == 400
            assert ("The passed data is not valid: "
                    "invalid polymorphic_identity wrong_type_no_shape is not a valid identity"
                    in response.json['errors'])
        data = {
            'layers': {
                "roofs": [
                    {
                        "id": "R1",
                        "type": "roof_plane",
                        "shape": {
                            "type": "polygon",
                            "points": [[1., 2.], [2., 3.], [3., 5]]
                        }
                    }
                ]
            }
        }
        with server.test_client() as c:
            response = c.post(self.path, json=data, follow_redirects=True, )
            assert response.status_code == 400
            assert response.json['errors'][0].startswith("The passed data is not valid:")

    def test_valid_mapping(self):
        data = {
            'layers': {
                "roofs": [
                    {
                        "id": "R1",
                        "type": "roof_plane",
                        "tilt": 0.,
                        "azimuth": 0.,
                        "shape": {
                            "type": "polygon",
                            "points": [[1., 2.], [2., 3.], [3., 5]]
                        }
                    },
                ],
                "modules": [
                    {
                        "id": "M!",
                        "type": "module",
                        "roof_id": "R1",
                        "shape": {
                            "type": "polygon",
                            "points": [[1., 2.], [2., 3.], [3., 5]]
                        }
                    },
                ]
            }
        }
        with server.test_client() as c:
            response = c.post(self.path, json=data, follow_redirects=True, )
        assert response.status_code == 200

    @pytest.mark.parametrize('case', ['dxfs/12roofs.dxf',
                                      'dxfs/tall.dxf',
                                      'dxfs/design_with_nested_roofs.dxf',
                                      'dxfs/many-roofs.dxf',
                                      'dxfs/sample.dxf', ])
    def test_saving_results_of_previous_dxf_import(self, case):
        with server.test_client() as c:
            # given a previous result of importing dxf
            with open(case, "rb") as f:
                data = {"dxf_upload": (f, 'test.dxf')}
                response_import = c.post(self.dxf_import,
                                         data=data, follow_redirects=True,
                                         content_type='multipart/form-data')
                assert response_import.status_code == 200
            # when we right away save imported dxf
            response_save = c.post(self.path, json=response_import.json, follow_redirects=True)
            # then it should be stored without any problems
            assert response_save.status_code == 200
