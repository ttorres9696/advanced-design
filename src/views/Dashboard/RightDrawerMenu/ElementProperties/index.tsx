import { Collapse, Grid, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, ListAlt } from '@material-ui/icons';
import { cloneDeep, isEqual } from 'lodash';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';

import { setDeleteDraggablePointMode, setNewDraggablePointMode } from '../../../../redux/canvas/actions';
import { setDeleteDialogParams } from '../../../../redux/core/actions';
import {
  finishHistoryItem,
  removeDraggablePoint,
  startHistoryItem,
  updateShape,
} from '../../../../redux/stage/actions';
import { getSolarTypeLayer } from '../../../../redux/stage/helpers';
import { availableTypesForEditing } from '../../../../shared/helpers/polygons.helper';
import useDebounce from '../../../../shared/hooks/useDebounce';
import { SolarElement } from '../../../../shared/models/SolarElement.interface';
import CircleProperties from './CircleProperties';
import GeneralProperties from './GeneralProperties';
import PolygonProperties from './PolygonProperties';
import useStyles from './styles';
import { ElementPropertiesProps } from './types';

export const NumberFormatInput = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      allowNegative={false}
    />
  );
};

export const AllowNegativeNumberFormatInput = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      allowNegative={true}
    />
  );
};

const ElementProperties: React.FC<ElementPropertiesProps> = ({ solarElement }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState<boolean>(true);
  const [editionVersion, setEditionVersion] = useState<SolarElement>();

  const { execute: debouncedFinishHistoryItem } = useDebounce(
    500,
    (elementIds: string[], layer: string, dispatch: any, finishHistoryItem: any) => {
      if (elementIds && layer && dispatch && finishHistoryItem) {
        dispatch(finishHistoryItem(elementIds, layer));
      }
    },
  );

  const onClickHeader = useCallback(() => {
    if (!!solarElement) {
      setExpanded(!expanded);
    }
  }, [solarElement, setExpanded, expanded]);

  const updateProperty = useCallback(
    (attr: string, value: any) => {
      if (!!editionVersion && !isEqual(editionVersion[attr], value)) {
        const layer = getSolarTypeLayer(editionVersion.type);

        setEditionVersion({
          ...editionVersion,
          [attr]: value,
        });
        dispatch(startHistoryItem([editionVersion.id], layer));
        dispatch(
          updateShape({
            ...editionVersion,
            [attr]: value,
          }),
        );
        debouncedFinishHistoryItem([editionVersion.id], layer, dispatch, finishHistoryItem);
      }
    },
    [editionVersion, setEditionVersion, dispatch, debouncedFinishHistoryItem],
  );

  const updateShapeProperty = useCallback(
    (attr: string, value: any) => {
      if (!!editionVersion && !isEqual(editionVersion.shape[attr], value)) {
        const layer = getSolarTypeLayer(editionVersion.type);

        setEditionVersion({
          ...editionVersion,
          shape: {
            ...editionVersion.shape,
            [attr]: value,
          },
        });
        dispatch(startHistoryItem([editionVersion.id], layer));
        dispatch(
          updateShape({
            ...editionVersion,
            shape: {
              ...editionVersion.shape,
              [attr]: value,
            },
          }),
        );
        debouncedFinishHistoryItem([editionVersion.id], layer, dispatch, finishHistoryItem);
      }
    },
    [editionVersion, setEditionVersion, dispatch, debouncedFinishHistoryItem],
  );

  const deletePoint = useCallback(
    (pointIndex: number) => {
      if (!!editionVersion) {
        const layer = getSolarTypeLayer(editionVersion.type);

        if (editionVersion.shape.points!.length > 3) {
          dispatch(startHistoryItem([editionVersion.id], layer));
          dispatch(removeDraggablePoint(layer, editionVersion.id, pointIndex));
          dispatch(finishHistoryItem([editionVersion.id], layer));
          dispatch(setNewDraggablePointMode(false));
          dispatch(setDeleteDraggablePointMode(false));
        } else {
          dispatch(
            setDeleteDialogParams({
              elementIds: [editionVersion.id],
              layer,
              open: true,
            }),
          );
        }
      }
    },
    [dispatch, editionVersion],
  );

  const deleteObject = useCallback(() => {
    if (!!editionVersion) {
      dispatch(
        setDeleteDialogParams({
          elementIds: [editionVersion.id],
          layer: getSolarTypeLayer(editionVersion.type),
          open: true,
        }),
      );
    }
  }, [dispatch, editionVersion]);

  useEffect(() => {
    if (
      (!!solarElement && !editionVersion) ||
      (!!solarElement && !!editionVersion && solarElement.id !== editionVersion.id) ||
      (!!solarElement && !!editionVersion && solarElement.shape.version !== editionVersion.shape.version)
    ) {
      setEditionVersion(cloneDeep(solarElement));
    }
  }, [solarElement, editionVersion, setEditionVersion]);

  return (
    <Fragment>
      <ListItem button onClick={onClickHeader}>
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>

        <ListItemText primary="Properties" />

        {!!solarElement ? <Fragment>{expanded ? <ExpandLess /> : <ExpandMore />}</Fragment> : null}
      </ListItem>

      <Collapse
        in={expanded && !!solarElement && !!editionVersion}
        timeout="auto"
        unmountOnExit
        className={classes.propertiesList}
      >
        <Grid container spacing={2} direction="column">
          <GeneralProperties
            azimuth={editionVersion && editionVersion.azimuth}
            tilt={editionVersion && editionVersion.tilt}
            updateProperty={updateProperty}
            deleteObject={deleteObject}
          />

          {!!solarElement && !!editionVersion && availableTypesForEditing.includes(editionVersion.type) ? (
            <Fragment>
              {editionVersion.shape.type === 'circle' ? (
                <CircleProperties
                  x={editionVersion.shape.x}
                  y={editionVersion.shape.y}
                  radius={editionVersion.shape.radius}
                  updateShapeProperty={updateShapeProperty}
                />
              ) : (
                <PolygonProperties
                  points={editionVersion.shape.points}
                  updateShapeProperty={updateShapeProperty}
                  deletePoint={deletePoint}
                />
              )}
            </Fragment>
          ) : null}
        </Grid>
      </Collapse>
    </Fragment>
  );
};

export default React.memo(ElementProperties);
