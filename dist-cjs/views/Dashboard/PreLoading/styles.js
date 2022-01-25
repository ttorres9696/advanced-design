"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _instantDesignCancelled = require("../../../shared/assets/instantDesignCancelled");

var _instantProposalLoading = require("../../../shared/assets/instantProposalLoading");

var _default = (0, _styles.makeStyles)(function (theme) {
  return (0, _styles.createStyles)({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    img: {
      width: 206,
      height: 133,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    loadingImg: {
      backgroundImage: "url('".concat(_instantProposalLoading.instantProposalLoading, "')")
    },
    cancelImg: {
      backgroundImage: "url('".concat(_instantDesignCancelled.instantDesignCancelled, "')")
    },
    loadingSubtitle: {
      fontWeight: 'bold',
      fontSize: 14
    },
    cancelButton: {
      fontWeight: 'bold',
      fontSize: 12,
      cursor: 'pointer',
      color: '#066BB2'
    }
  });
});

exports.default = _default;