import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';

import store from './redux';
import theme from './shared/theme';
import { AdvancedDesignProps } from './types';
import { Dashboard } from './views';

const AdvancedDesignCore: React.FC<AdvancedDesignProps> = ({ solarDesign, ...callbackProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Dashboard solarDesign={solarDesign} {...callbackProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default AdvancedDesignCore;
