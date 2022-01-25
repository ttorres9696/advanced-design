import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { selectBoxIcon } from '../../../shared/assets/selectBoxIcon';
import { selectCursorIcon } from '../../../shared/assets/selectCursorIcon';

export default makeStyles((theme: Theme) =>
  createStyles({
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
        cursor: 'pointer',
      },
      '&:focus': {
        outline: 'none !important',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    selected: {
      backgroundColor: '#0566AD',
      color: '#FFF',
    },
    iconGroup: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 4,
    },
    boxIcon: {
      backgroundImage: `url('${selectBoxIcon}')`,
      width: 24,
      height: 24,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    cursorIcon: {
      marginLeft: 9,
      marginTop: -15,
      backgroundImage: `url('${selectCursorIcon}')`,
      width: 15,
      height: 15,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    iconSelectedMode: {
      filter: 'invert(1)',
    },
  }),
);
