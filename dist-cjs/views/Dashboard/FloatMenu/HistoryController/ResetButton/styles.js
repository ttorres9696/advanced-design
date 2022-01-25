"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    button: {
      backgroundColor: '#FFF',
      padding: '15px 0',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      border: 'none',
      '&:hover': {
        cursor: 'pointer'
      },
      '&:focus': {
        outline: 'none !important'
      },
      '&:disabled': {
        cursor: 'not-allowed'
      },
      '&:active': {
        backgroundColor: '#0566AD',
        color: '#FFF'
      }
    }
  });
});

exports.default = _default;