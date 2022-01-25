import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    content: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 2,
      width: '100%',
      '&:focus': {
        outline: 'none !important',
      },
    },
  }),
);
