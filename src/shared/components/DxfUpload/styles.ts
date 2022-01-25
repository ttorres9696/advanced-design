import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(2),
    },
    uploadInput: {
      display: 'none',
    },
  }),
);
