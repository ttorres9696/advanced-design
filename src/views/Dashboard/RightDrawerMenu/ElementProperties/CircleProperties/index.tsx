import { Grid, TextField, Typography } from '@material-ui/core';
import { Decimal } from 'decimal.js';
import React from 'react';

import { AllowNegativeNumberFormatInput, NumberFormatInput } from '..';
import { defaultMultiplierScale } from '../../../../../redux/stage/types';
import { CirclePropertiesProps } from './types';

const CircleProperties: React.FC<CirclePropertiesProps> = ({ x, y, radius, updateShapeProperty }) => {
  return (
    <Grid item container xs={12} spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography variant="overline">Center</Typography>
      </Grid>

      <Grid item container xs={12} spacing={2} direction="row">
        <Grid item xs={12} sm={6}>
          <TextField
            id="center-x-edit"
            label="X"
            fullWidth
            value={x ? new Decimal(x).dividedBy(defaultMultiplierScale).toNumber() : ''}
            type="tel"
            onChange={(event: React.ChangeEvent<{ value: string }>) => {
              updateShapeProperty('x', new Decimal(event.target.value).mul(defaultMultiplierScale).toNumber());
            }}
            InputProps={{
              inputComponent: AllowNegativeNumberFormatInput,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="center-y-edit"
            label="Y"
            fullWidth
            value={y ? new Decimal(y).dividedBy(defaultMultiplierScale).toNumber() : ''}
            type="tel"
            onChange={(event: React.ChangeEvent<{ value: string }>) => {
              updateShapeProperty('y', new Decimal(event.target.value).mul(defaultMultiplierScale).toNumber());
            }}
            InputProps={{
              inputComponent: AllowNegativeNumberFormatInput,
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="radius-edit"
          label="Radius"
          fullWidth
          value={radius || ''}
          type="tel"
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            updateShapeProperty('radius', parseFloat(event.target.value));
          }}
          InputProps={{
            inputComponent: NumberFormatInput,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(CircleProperties);
