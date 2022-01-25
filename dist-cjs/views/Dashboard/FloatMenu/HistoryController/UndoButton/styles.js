"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _undoIcon = require("../../../../../shared/assets/undoIcon");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    button: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFF',
      border: 'none',
      padding: '15px 0',
      marginRight: 1,
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
        color: '#FFF',
        '& img': {
          filter: 'invert(1)'
        }
      }
    },
    icon: {
      backgroundImage: "url('".concat(_undoIcon.undoIcon, "')"),
      display: 'inline-block',
      width: 15,
      height: 12,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    disabledIcon: {
      opacity: 0.5
    }
  });
});

exports.default = _default;