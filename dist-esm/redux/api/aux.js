"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchModules = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchModules = function fetchModules() {
  var url = '/aux/modules';
  return new Promise(function (resolve, reject) {
    (0, _axios.default)({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      resolve(response.data.modules);
    }).catch(function (error) {
      reject(error);
    });
  });
};

exports.fetchModules = fetchModules;