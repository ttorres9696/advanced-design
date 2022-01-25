import { Grid, TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { NumberFormatInput } from '..';
import DeleteButton from '../../../../../shared/components/DeleteButton';
import { GeneralPropertiesProps } from './types';

const GeneralProperties: React.FC<GeneralPropertiesProps> = ({ azimuth, tilt, updateProperty, deleteObject }) => {
  const [azimuthValue, setAzimuthValue] = useState<number | undefined>(undefined);
  const [tiltValue, setTiltValue] = useState<number | undefined>(undefined);

  const onChange = useCallback(
    (attr: string, value: number) => {
      if (attr === 'azimuth' && value !== azimuth) {
        setAzimuthValue(value);
        updateProperty(attr, value);
      } else if (attr === 'tilt' && value !== tilt) {
        setTiltValue(value);
        updateProperty(attr, value);
      }
    },
    [azimuth, tilt, updateProperty],
  );

  const onDeleteObjectClick = useCallback(() => {
    deleteObject();
  }, [deleteObject]);

  useEffect(() => {
    setAzimuthValue(azimuth);
    setTiltValue(tilt);
  }, [azimuth, tilt]);

  return (
    <Grid item container xs={12} spacing={2} direction="row">
      <Grid item xs={12} sm={6}>
        <TextField
          id="azimuth-edit"
          label="Azimuth"
          fullWidth
          value={azimuthValue || ''}
          type="tel"
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            onChange('azimuth', parseFloat(event.target.value));
          }}
          InputProps={{
            inputComponent: NumberFormatInput,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          id="tilt-edit"
          label="Tilt"
          fullWidth
          value={tiltValue || ''}
          type="tel"
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            onChange('tilt', parseFloat(event.target.value));
          }}
          InputProps={{
            inputComponent: NumberFormatInput,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <DeleteButton />
      </Grid>
    </Grid>
  );
};

export default React.memo(GeneralProperties);
