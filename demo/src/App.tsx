import './App.css';

import AdvancedDesign from 'advanced-design';
import React from 'react';
import mockSolarDesign from './solarDesign.mock';

const App = () => {
  return (
    <AdvancedDesign
      solarDesign={mockSolarDesign}
      onProductionChange={(newProductionValue: number, systemSize: number) =>
        console.log(`onProductionChange`, newProductionValue, systemSize)
      }
    />
  );
};

export default App;
