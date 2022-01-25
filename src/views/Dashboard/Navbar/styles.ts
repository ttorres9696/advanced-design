import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: `100%`,
      },
    },
    appBarRightShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: `100%`,
      [theme.breakpoints.up('sm')]: {
        width: `100%`,
      },
    },
    rightMenuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      whiteSpace: 'nowrap',
    },
    zoomController: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    zoomValue: {
      width: 45,
      textAlign: 'center',
    },
    titleToolbar: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    subToolbar: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }),
);
