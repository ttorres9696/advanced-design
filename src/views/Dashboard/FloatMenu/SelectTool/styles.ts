import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { selectBoxIcon } from '../../../../shared/assets/selectBoxIcon';
import { selectCursorIcon } from '../../../../shared/assets/selectCursorIcon';

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: 'relative',
      backgroundColor: '#FFF',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      border: 'none',
      fontFamily: 'Roboto',
      color: '#000',
      padding: '25px 35px',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        outline: 'none !important',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 1,
      width: '100%',
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
