import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { decreaseProductionValue, increaseProductionValue, resetProductionValue } from '../../redux/core/actions';
import { HistoryItem } from '../../redux/stage/state';
import { SolarElement } from '../models/SolarElement.interface';
import { UseProductionProps } from '../models/UseProductionProps.interface';

const useProduction = ({ onProductionChange }: UseProductionProps) => {
  const dispatch = useDispatch();

  const selectedModuleSpec = useSelector((state: RootState) => state.stage.selectedModuleSpec);
  const productionValue = useSelector((state: RootState) => state.core.totalProduction);
  const activeModulesLength = useSelector((state: RootState) =>
    state.stage.selectedModuleSpec
      ? Object.values(state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].layers.modules).filter(
          module => module.active,
        ).length
      : 0,
  );

  const history = useSelector((state: RootState) =>
    state.stage.selectedModuleSpec ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].history : [],
  );
  const historyActiveIndex = useSelector((state: RootState) =>
    state.stage.selectedModuleSpec
      ? state.stage.moduleSpecsStages[state.stage.selectedModuleSpec!.series].activeHistoryIndex
      : -1,
  );

  const [historyLength, setHistoryLength] = useState<number>(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState<number>(-1);

  const isElementFromModulesLayer = useCallback((layerName: string): boolean => layerName === 'modules', []);

  const doesElementHaveProductionValue = useCallback(
    (oldVersion?: SolarElement, newVersion?: SolarElement): boolean =>
      (!!oldVersion && !!oldVersion.production) || (!!newVersion && !!newVersion.production),
    [],
  );

  const checkActiveModules = useCallback(
    (elementId: string, previousVersion?: SolarElement, currentVersion?: SolarElement) => {
      const previousActiveStatus = previousVersion && previousVersion.active;
      const currentActiveStatus = currentVersion && currentVersion.active;

      const currentProductionValue = currentVersion && currentVersion.production ? currentVersion.production : 0;

      if (!previousActiveStatus && currentActiveStatus) {
        // increase total production value
        dispatch(increaseProductionValue(currentProductionValue));
      } else if (previousActiveStatus && !currentActiveStatus) {
        // decrease total production value
        dispatch(decreaseProductionValue(currentProductionValue));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (historyActiveIndex === -1) {
      dispatch(resetProductionValue);
      setPreviousActiveIndex(historyActiveIndex);
      return;
    }

    if (history.length !== historyLength) {
      setHistoryLength(history.length);
    }

    const moduleChanges =
      historyActiveIndex >= 0
        ? history[historyActiveIndex].filter(
            (item: HistoryItem) =>
              isElementFromModulesLayer(item.layer) && doesElementHaveProductionValue(item.oldElement, item.newElement),
          )
        : [];

    if (moduleChanges.length > 0 && historyActiveIndex !== previousActiveIndex) {
      moduleChanges.forEach((item: HistoryItem) => {
        const [previousVersion, currentVersion]: (SolarElement | undefined)[] =
          previousActiveIndex < historyActiveIndex
            ? [item.oldElement, item.newElement]
            : [item.newElement, item.oldElement];

        checkActiveModules(item.elementId, previousVersion, currentVersion);
      });
    }

    setPreviousActiveIndex(historyActiveIndex);
  }, [
    dispatch,
    history,
    historyActiveIndex,
    historyLength,
    setHistoryLength,
    previousActiveIndex,
    setPreviousActiveIndex,
    isElementFromModulesLayer,
    doesElementHaveProductionValue,
    checkActiveModules,
  ]);

  const getSystemSize = useCallback((): number => {
    return selectedModuleSpec ? activeModulesLength * selectedModuleSpec.wattage : 0;
  }, [selectedModuleSpec, activeModulesLength]);

  useEffect(() => {
    if (onProductionChange) {
      onProductionChange(productionValue, getSystemSize());
    }
  }, [productionValue, onProductionChange, getSystemSize]);
};

export default useProduction;
