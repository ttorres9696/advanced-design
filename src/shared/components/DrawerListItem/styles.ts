import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    subItem: {
      paddingLeft: theme.spacing(2),
    },
    subList: {
      paddingLeft: theme.spacing(2),
    },
    selectedWithSubList: {
      backgroundColor: `rgba(0, 0, 0, 0.05) !important`,
    },
  }),
);
