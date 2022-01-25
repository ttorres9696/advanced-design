import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { instantDesignCancelled } from '../../../shared/assets/instantDesignCancelled';
import { instantProposalLoading } from '../../../shared/assets/instantProposalLoading';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 206,
      height: 133,
      display: 'inline-block',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    loadingImg: {
      backgroundImage: `url('${instantProposalLoading}')`,
    },
    cancelImg: {
      backgroundImage: `url('${instantDesignCancelled}')`,
    },
    loadingSubtitle: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    cancelButton: {
      fontWeight: 'bold',
      fontSize: 12,
      cursor: 'pointer',
      color: '#066BB2',
    },
  }),
);
