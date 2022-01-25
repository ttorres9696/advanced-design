import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const defaultColor = '#0071B9';
const disabledColor = '#000';
const backgroundColor = '#FFF';

export default makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      marginTop: 10,
      borderRadius: 3,
      borderColor: defaultColor,
      color: defaultColor,
      backgroundColor,
      opacity: 0.7,
      '&:hover': {
        opacity: 1,
        cursor: 'pointer',
        backgroundColor,
      },
      '&:focus': {
        outline: 'none !important',
      },
      '&:disabled': {
        opacity: 0.5,
        borderColor: disabledColor,
        color: disabledColor,
        cursor: 'not-allowed !important',
      },
    },
  }),
);
