"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _selectBoxIcon = require("../../../shared/assets/selectBoxIcon");

var _selectCursorIcon = require("../../../shared/assets/selectCursorIcon");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    button: {
      position: 'absolute',
      backgroundColor: '#FFF',
      boxShadow: '2px 2px 4px #EEE',
      borderRadius: '5px',
      fontFamily: 'Roboto',
      color: '#000',
      border: '1px solid #CCC',
      padding: '25px 35px',
      top: '90px',
      left: '20px',
      zIndex: 9999,
      '&:hover': {
        cursor: 'pointer'
      },
      '&:focus': {
        outline: 'none !important'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    selected: {
      backgroundColor: '#0566AD',
      color: '#FFF'
    },
    iconGroup: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 4
    },
    boxIcon: {
      backgroundImage: "url('".concat(_selectBoxIcon.selectBoxIcon, "')"),
      width: 24,
      height: 24,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    cursorIcon: {
      marginLeft: 9,
      marginTop: -15,
      backgroundImage: "url('".concat(_selectCursorIcon.selectCursorIcon, "')"),
      width: 15,
      height: 15,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    iconSelectedMode: {
      filter: 'invert(1)'
    }
  });
});

exports.default = _default;