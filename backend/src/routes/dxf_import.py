import logging
from io import StringIO
import dxfgrabber
from flask import Blueprint, request, jsonify

from dxf.aurora_import import parse_aurora_dxf
from mappers.solar_design_mapper import SolarDesignMapper
from model.module_spec import ModuleSpec

logger = logging.getLogger(__name__)
DXF_IMPORT_BLUEPRINT = Blueprint("dxf_import", __name__, url_prefix="/dxf")


@DXF_IMPORT_BLUEPRINT.route('/aurora', methods=['POST'])
def import_aurora_dxf():
    """
    This endpoint expects a DXF file from Aurora, and returns a json object representing
    design from DXF.
    """
    if request.files:
        uploaded_file = request.files.get("dxf_upload")
        if uploaded_file and uploaded_file.filename:
            try:
                file_content = uploaded_file.read().decode('utf-8')
            except UnicodeDecodeError:
                logger.warning(f"System was not able to read {uploaded_file.filename}")
                return jsonify({"error": f"System was not able to read {uploaded_file.filename}"}), 400
            dxf = dxfgrabber.read(StringIO(file_content))
            # TODO: module spec is fixed to X22-360-D-AC module
            solar_design, unknown_elements = parse_aurora_dxf(dxf, ModuleSpec(name="X22-360-D-AC"))
            if unknown_elements:
                logger.warning(f"Found unknown entities while parsing {uploaded_file.filename}: "
                               f"{[f'type {e.dxftype} at layer {e.layer}' for e in unknown_elements]}")
            return jsonify(SolarDesignMapper(obj=solar_design).serialize())
    return jsonify({"error": f"The request was missing a file."}), 400
