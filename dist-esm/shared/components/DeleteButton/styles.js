"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var defaultColor = '#0071B9';
var disabledColor = '#000';
var backgroundColor = '#FFF';

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    deleteButton: {
      marginTop: 10,
      borderRadius: 3,
      borderColor: defaultColor,
      color: defaultColor,
      backgroundColor: backgroundColor,
      opacity: 0.7,
      '&:hover': {
        opacity: 1,
        cursor: 'pointer',
        backgroundColor: backgroundColor
      },
      '&:focus': {
        outline: 'none !important'
      },
      '&:disabled': {
        opacity: 0.5,
        borderColor: disabledColor,
        color: disabledColor,
        cursor: 'not-allowed !important'
      }
    }
  });
});

exports.default = _default;