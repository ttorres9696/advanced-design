import io

from flask import url_for

from server import server


class TestAuroraDxfImport:
    @classmethod
    def setup_class(cls):
        with server.test_client() as c:
            with server.app_context(), server.test_request_context():
                cls.aurora_dxf_import_path = url_for('dxf_import.import_aurora_dxf')

    def test_import_aurora_dxf_wrong_method(self):
        with server.test_client() as c:
            response = c.get(self.aurora_dxf_import_path)
            assert response.status_code == 405

    def test_import_aurora_dxf_no_file(self):
        data = {}
        with server.test_client() as c:
            response = c.post(self.aurora_dxf_import_path,
                              data=data, follow_redirects=True,
                              content_type='multipart/form-data'
                              )
            assert response.status_code == 400
            assert "The request was missing a file" in str(response.json)

    def test_import_aurora_dxf_bad_file(self):
        data = {"dxf_upload": (io.BytesIO(b"abcdef\234\235some_invalid_stream"), 'test.dxf')}
        with server.test_client() as c:
            response = c.post(self.aurora_dxf_import_path,
                              data=data, follow_redirects=True,
                              content_type='multipart/form-data'
                              )
            assert response.status_code == 400
            assert "System was not able to read test.dxf" in str(response.json)

    def test_import_aurora_dxf_correct_dxf_file(self):
        with open("dxfs/sample.dxf", "rb") as f:
            data = {"dxf_upload": (f, 'test.dxf')}
            with server.test_client() as c:
                response = c.post(self.aurora_dxf_import_path,
                                  data=data, follow_redirects=True,
                                  content_type='multipart/form-data'
                                  )
                assert response.status_code == 200
                assert "layers" in response.json
                assert "modules" in response.json["layers"]
                assert len(response.json["layers"]["modules"]) > 1
                first_module = response.json["layers"]["modules"][0]
                assert "id" in first_module
                assert "shape" in first_module
                assert "roof_id" in first_module
                assert first_module['type'] is not None
                first_module_shape = first_module['shape']
                assert "points" in first_module_shape
                assert "type" in first_module_shape
                assert first_module_shape['type'] is not None
                assert "module_spec" in response.json
                assert "name" in response.json['module_spec']
                assert "size" in response.json['module_spec']
                assert "spacing" in response.json['module_spec']
