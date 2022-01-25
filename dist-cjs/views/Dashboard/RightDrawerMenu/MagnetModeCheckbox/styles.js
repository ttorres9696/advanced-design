"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    paper: {
      margin: theme.spacing(0, 1, 1, 1),
      backgroundColor: theme.palette.primary.main
    },
    checkboxContainer: {
      padding: theme.spacing(1),
      color: '#FFF'
    },
    checkboxContainerBorderRight: {
      borderRight: '1px solid rgba(0,0,0,0.3)'
    },
    checkbox: {
      color: '#FFF',
      '&:checked': {
        color: '#FFF'
      }
    },
    labelContainer: {
      height: '100%',
      padding: theme.spacing(2),
      color: '#FFF',
      cursor: 'pointer'
    }
  });
});

exports.default = _default;