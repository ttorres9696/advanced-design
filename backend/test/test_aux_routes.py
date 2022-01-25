from flask import url_for

from server import server


def test_modules_route():
    with server.test_client() as c:
        with server.app_context(), server.test_request_context():
            modules_path = url_for('auxiliary_routes.get_modules_list')

        response = c.get(modules_path, follow_redirects=True)
        assert response.status_code == 200
        assert "modules" in response.json
        modules_spec = response.json['modules']
        assert len(modules_spec) > 0
        module_spec_a = modules_spec[0]
        assert 'name' in module_spec_a
        assert 'size' in module_spec_a
        assert 'spacing' in module_spec_a
        assert 'wattage' in module_spec_a
        assert module_spec_a['size'][0] > 0.
        assert module_spec_a['size'][1] > 0.
        assert module_spec_a['spacing'][0] > 0.
        assert module_spec_a['spacing'][1] > 0.
