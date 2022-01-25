import json
import logging

from flask import Blueprint, request, jsonify
from kim import MappingInvalid, MapperError

from mappers.solar_design_mapper import SolarDesignMapper

logger = logging.getLogger(__name__)
DESIGN_BLUEPRINT = Blueprint("design", __name__, url_prefix="/design")


@DESIGN_BLUEPRINT.route('/save', methods=['POST'])
def save():
    """
    This endpoint serves as common point for saving results of work regardless of the starting point.
    The passed content should be a json representation of a Solar Design object.
    """
    content = request.json
    if not content:
        return jsonify({"errors": ["Could not read content of request"]}), 400

    try:
        solar_design_mapper = SolarDesignMapper(data=content)
        solar_design = solar_design_mapper.marshal()
    except MapperError as ex:
        return jsonify({"errors": [f"The passed data is not valid: {ex.message}"]}), 400
    except MappingInvalid as ex:
        return jsonify({"errors": [f"The passed data is not valid: {json.dumps(ex.errors)}"]}), 400

    # TODO: here should be a real storage action and/or sending to an external service
    logger.debug(f"Solar design with {len(solar_design.roofs)} roofs,"
                 f" and {len(solar_design.modules)} modules received.")

    return jsonify({"status": "Design was successfully stored."}), 200
