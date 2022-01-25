"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _SolarDesign = require("../../shared/geometry/SolarDesign");

var _actions = require("../canvas/actions");

var _actions2 = require("../stage/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadDxf = function uploadDxf(dxfFile, onUploadProgress) {
  var url = '/dxf/aurora';
  var formData = new FormData();
  formData.append('dxf_upload', dxfFile);
  return new Promise(function (resolve, reject) {
    (0, _axios.default)({
      method: 'POST',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: onUploadProgress
    }).then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var importDxfFile = function importDxfFile(dxfFile) {
  return function (dispatch) {
    return uploadDxf(dxfFile, function (event) {// TODO: Progress logic here
      // IMPORTANT: event.loaded and event.total
    }).then(function (data) {
      dispatch((0, _actions.setCanvasOrigin)((0, _SolarDesign.getLowerCoords)(data)));
      dispatch((0, _actions2.importData)(data));
    }).catch(function (error) {// Error handling here into a catch function
      // (error) => dispatch(failedImportMsg(error)),
    });
  };
};

var _default = importDxfFile;
exports.default = _default;