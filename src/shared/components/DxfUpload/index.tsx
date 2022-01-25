import { Button, FormControl, Grid, InputLabel, Select } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import importDxfFile from '../../../redux/api/design';
import { ModuleSpec } from '../../models/SolarDesign.interface';
import useStyles from './styles';
import { DxfUProps } from './types';

const DxfUpload: React.FC<DxfUProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const moduleSpecs = useSelector((state: RootState) => state.core.moduleSpecs);

  const [selectedModuleSpec, setSelectedModuleSpec] = useState('');

  const upload = useCallback((e: any) => dispatch(importDxfFile(e.target.files[0])), [dispatch]);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    if (inputLabel && inputLabel.current) {
      setLabelWidth(inputLabel.current!.offsetWidth);
    }
  }, [inputLabel]);

  const handleChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedModuleSpec(event.target.value as string);
  }, []);

  if (!moduleSpecs) {
    return null;
  }

  return (
    <form className={classes.form}>
      <input id="dxf-upload-input" type="file" onChange={upload} className={classes.uploadInput} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel ref={inputLabel} htmlFor="module-spec-select">
              Module Spec
            </InputLabel>
            <Select
              native
              value={selectedModuleSpec}
              onChange={handleChange}
              labelWidth={labelWidth}
              inputProps={{
                name: 'module-spec',
                id: 'module-spec-select',
              }}
              fullWidth
            >
              <option value="" />
              {moduleSpecs
                ? moduleSpecs.map((moduleSpec: ModuleSpec) => (
                    <option key={moduleSpec.name} value={moduleSpec.name}>
                      {moduleSpec.name}
                    </option>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="dxf-upload-input">
            <Button variant="contained" component="span" color="primary" startIcon={<CloudUploadIcon />} fullWidth>
              DXF Upload
            </Button>
          </label>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(DxfUpload);
