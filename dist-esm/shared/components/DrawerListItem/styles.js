"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    subItem: {
      paddingLeft: theme.spacing(2)
    },
    subList: {
      paddingLeft: theme.spacing(2)
    },
    selectedWithSubList: {
      backgroundColor: "rgba(0, 0, 0, 0.05) !important"
    }
  });
});

exports.default = _default;