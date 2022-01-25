import axios, { AxiosError, AxiosResponse } from 'axios';

import { getLowerCoords } from '../../shared/geometry/SolarDesign';
import { SolarDesign } from '../../shared/models/SolarDesign.interface';
import { setCanvasOrigin } from '../canvas/actions';
import { AppDispatch } from '../index';
import { importData } from '../stage/actions';

const uploadDxf = (dxfFile: File, onUploadProgress: (event: ProgressEvent) => void): Promise<SolarDesign> => {
  const url = '/dxf/aurora';
  const formData = new FormData();
  formData.append('dxf_upload', dxfFile);

  return new Promise<SolarDesign>((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
      .then((response: AxiosResponse<SolarDesign>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

const importDxfFile = (dxfFile: File) => {
  return (dispatch: AppDispatch) => {
    return uploadDxf(dxfFile, (event: ProgressEvent) => {
      // TODO: Progress logic here
      // IMPORTANT: event.loaded and event.total
    })
      .then(data => {
        dispatch(setCanvasOrigin(getLowerCoords(data)));
        dispatch(importData(data));
      })
      .catch(error => {
        // Error handling here into a catch function
        // (error) => dispatch(failedImportMsg(error)),
      });
  };
};

export default importDxfFile;
