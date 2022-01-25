"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _red = _interopRequireDefault(require("@material-ui/core/colors/red"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    deleteButton: {
      borderColor: _red.default[200],
      color: _red.default[500],
      '&:hover': {
        borderColor: _red.default[500],
        backgroundColor: _red.default[50]
      }
    }
  });
});

exports.default = _default;