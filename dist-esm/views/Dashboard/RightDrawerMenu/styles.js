"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.drawerWidth = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawerWidth = 240;
exports.drawerWidth = drawerWidth;

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpened: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClosed: _defineProperty({
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: 0
    }, theme.breakpoints.up('sm'), {
      width: theme.spacing(9) + 1
    })
  });
});

exports.default = _default;