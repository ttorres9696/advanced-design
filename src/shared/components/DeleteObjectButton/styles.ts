import RED from '@material-ui/core/colors/red';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      borderColor: RED[200],
      color: RED[500],
      '&:hover': {
        borderColor: RED[500],
        backgroundColor: RED[50],
      },
    },
  }),
);
