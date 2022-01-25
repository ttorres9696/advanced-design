import { AppDispatch } from '../index';
declare const importDxfFile: (dxfFile: File) => (dispatch: AppDispatch) => Promise<void>;
export default importDxfFile;
