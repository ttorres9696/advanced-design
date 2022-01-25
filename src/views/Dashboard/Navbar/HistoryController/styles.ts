import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    controller: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
