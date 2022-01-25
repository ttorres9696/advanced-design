import RED from '@material-ui/core/colors/red';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    paddingLeft: {
      paddingLeft: theme.spacing(1),
    },
    paddingRight: {
      paddingRight: theme.spacing(1),
    },
    cancelButton: {
      borderColor: RED[200],
      color: RED[500],
      '&:hover': {
        borderColor: RED[500],
        backgroundColor: RED[50],
      },
    },
  }),
);
