import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(0, 1, 1, 1),
      backgroundColor: theme.palette.primary.main,
    },
    checkboxContainer: {
      padding: theme.spacing(1),
      color: '#FFF',
    },
    checkboxContainerBorderRight: {
      borderRight: '1px solid rgba(0,0,0,0.3)',
    },
    checkbox: {
      color: '#FFF',
      '&:checked': {
        color: '#FFF',
      },
    },
    labelContainer: {
      height: '100%',
      padding: theme.spacing(2),
      color: '#FFF',
      cursor: 'pointer',
    },
  }),
);
