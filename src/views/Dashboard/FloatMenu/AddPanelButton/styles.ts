import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { addPanelIcon } from '../../../../shared/assets/addPanelIcon';

export default makeStyles((theme: Theme) =>
  createStyles({
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
        cursor: 'pointer',
      },
      '&:focus': {
        outline: 'none !important',
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
      backgroundImage: `url('${addPanelIcon}')`,
      display: 'inline-block',
      width: 36,
      height: 30,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  }),
);
