"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    root: {
      flexGrow: 1
    },
    appBar: _defineProperty({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }, theme.breakpoints.up('sm'), {
      width: "100%"
    }),
    appBarRightShift: _defineProperty({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      width: "100%"
    }, theme.breakpoints.up('sm'), {
      width: "100%"
    }),
    rightMenuButton: {
      marginLeft: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      whiteSpace: 'nowrap'
    },
    zoomController: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    zoomValue: {
      width: 45,
      textAlign: 'center'
    },
    titleToolbar: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    subToolbar: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  });
});

exports.default = _default;