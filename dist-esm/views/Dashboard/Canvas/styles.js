"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    content: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 2,
      width: '100%',
      '&:focus': {
        outline: 'none !important'
      }
    }
  });
});

exports.default = _default;