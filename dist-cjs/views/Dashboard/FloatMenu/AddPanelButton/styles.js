"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _addPanelIcon = require("../../../../shared/assets/addPanelIcon");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    button: {
      position: 'relative',
      backgroundColor: '#FFF',
      border: 'none',
      fontFamily: 'Roboto',
      color: '#000',
      padding: '25px 35px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 1,
      '&:hover': {
        cursor: 'pointer'
      },
      '&:focus': {
        outline: 'none !important'
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
      backgroundImage: "url('".concat(_addPanelIcon.addPanelIcon, "')"),
      display: 'inline-block',
      width: 36,
      height: 30,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    }
  });
});

exports.default = _default;