import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    controller: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 1,
    },
  }),
);
