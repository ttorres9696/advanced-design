import axios, { AxiosError, AxiosResponse } from 'axios';

import { ModuleSpec } from '../../shared/models/SolarDesign.interface';

export const fetchModules = (): Promise<ModuleSpec[]> => {
  const url = '/aux/modules';

  return new Promise<ModuleSpec[]>((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response: AxiosResponse<{ modules: ModuleSpec[] }>) => {
        resolve(response.data.modules);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
