"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    container: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column'
    },
    menu: {
      position: 'relative',
      backgroundColor: '#D0D4DB',
      boxShadow: '2px 2px 4px #EEE',
      borderRadius: '5px',
      color: '#000',
      border: '1px solid #D0D4DB',
      '&:focus': {
        outline: 'none !important'
      }
    }
  });
});

exports.default = _default;