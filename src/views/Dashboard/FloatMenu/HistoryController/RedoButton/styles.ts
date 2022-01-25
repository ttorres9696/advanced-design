import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { redoIcon } from '../../../../../shared/assets/redoIcon';

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFF',
      border: 'none',
      padding: '15px 0',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        outline: 'none !important',
      },
      '&:disabled': {
        cursor: 'not-allowed',
      },
      '&:active': {
        backgroundColor: '#0566AD',
        color: '#FFF',
        '& img': {
          filter: 'invert(1)',
        },
      },
    },
    icon: {
      backgroundImage: `url('${redoIcon}')`,
      display: 'inline-block',
      width: 15,
      height: 12,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    disabledIcon: {
      opacity: 0.5,
    },
  }),
);
