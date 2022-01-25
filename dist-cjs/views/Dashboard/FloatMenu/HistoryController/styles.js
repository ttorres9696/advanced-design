"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    controller: {
      display: 'flex',
      flexDirection: 'column'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 1
    }
  });
});

exports.default = _default;