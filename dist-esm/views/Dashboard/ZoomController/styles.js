"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    controller: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#D0D4DB',
      boxShadow: '2px 2px 4px #EEE',
      borderRadius: 2,
      color: '#000',
      border: '1px solid #D0D4DB',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      '&:focus': {
        outline: 'none !important'
      }
    },
    zoomButton: {
      backgroundColor: '#FFF',
      padding: 10,
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
    },
    zoomInButton: {
      marginBottom: 1,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2
    },
    zoomOutButton: {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2
    }
  });
});

exports.default = _default;