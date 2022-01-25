import { Box } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux';
import useProduction from '../../shared/hooks/useProduction';
import Canvas from './Canvas';
import { CanvasDimension } from './Canvas/types';
import DeleteElementConfirmationDialog from './DeleteElementConfirmationDialog';
import FloatMenu from './FloatMenu';
import PreLoading from './PreLoading';
import useStyles from './styles';
import { DashboardProps } from './types';
import useDashboard from './useDashboard';
import ZoomController from './ZoomController';

const Dashboard: React.FC<DashboardProps> = ({ solarDesign, onProductionChange }) => {
  const classes = useStyles();
  const parentBoxRef = React.useRef();

  const windowDimension = useSelector((state: RootState) => state.core.windowDimension);
  const [dimension, setDimension] = useState<CanvasDimension>({
    width: 0,
    height: 0,
  });

  const { isDeleteDialogOpen, onDeleteConfirm, multiple, preLoading } = useDashboard();

  useProduction({ onProductionChange });

  const onWindowResize = useCallback(() => {
    if (parentBoxRef === undefined || parentBoxRef.current === undefined) {
      return;
    }
    // @ts-ignore
    let rect = parentBoxRef.current.getBoundingClientRect();
    const newWidth = rect!.width;
    const newHeight = rect!.height;

    if (dimension.width !== newWidth || dimension.height !== newHeight) {
      setDimension({
        width: newWidth,
        height: newHeight,
      });
    }
  }, [dimension, parentBoxRef, windowDimension]);

  useEffect(() => {
    if (windowDimension) {
      onWindowResize();
    }
  }, [parentBoxRef, windowDimension, onWindowResize, preLoading]);

  if (preLoading) {
    return <PreLoading />;
  }

  return (
    // @ts-ignore
    <Box className={classes.root} {...({ ref: parentBoxRef } as any)}>
      <Canvas solarDesign={solarDesign} canvasDimension={dimension} />
      <FloatMenu />
      <ZoomController />
      <DeleteElementConfirmationDialog open={isDeleteDialogOpen} callback={onDeleteConfirm} multiple={multiple} />
    </Box>
  );
};

export default Dashboard;
