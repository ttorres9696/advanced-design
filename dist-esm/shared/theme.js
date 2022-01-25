"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      light: '#80cbc4',
      main: '#009688',
      dark: '#004d40',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#80cbc4',
      main: '#ffcc80',
      dark: '#e65100',
      contrastText: '#000000'
    }
  }
});

exports.default = _default;