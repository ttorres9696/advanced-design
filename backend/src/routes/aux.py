import logging
from flask import Blueprint, jsonify

from model.module_spec import get_available_modules

logger = logging.getLogger(__name__)
AUX_BLUEPRINT = Blueprint("auxiliary_routes", __name__, url_prefix="/aux")


@AUX_BLUEPRINT.route('/modules', methods=['GET'])
def get_modules_list():
    """
    Endpoint serves a list of supported modules
    """
    return jsonify({"modules": [module_spec.to_dict() for module_spec in get_available_modules()]}), 200
