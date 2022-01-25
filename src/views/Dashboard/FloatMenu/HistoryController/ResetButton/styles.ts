import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: '#FFF',
      padding: '15px 0',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      border: 'none',
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
      },
    },
  }),
);
