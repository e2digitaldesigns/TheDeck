import {
  IntGlobalContextInterface,
  IpcRendererTypes,
  IpcRendererTypesAction
} from "./../../types";

import { window } from "./window";
// declare const window: any;

export interface IntElectronHook {
  ipcRender: (
    name: IpcRendererTypes,
    data: IpcRendererTypesAction | object
  ) => void;
  loadAppData: () => void;
  saveAppData: (data: IntGlobalContextInterface) => void;
}

const ipcRenderer = window?.electron?.ipcRenderer;

const useElectronHook = (): IntElectronHook => {
  const ipcRender = (name: string, data: string | object) => {
    ipcRenderer && ipcRenderer.send(name, data);
  };

  const loadAppData: IntElectronHook["loadAppData"] = () => {
    ipcRenderer &&
      ipcRenderer.send(IpcRendererTypes.database, {
        action: IpcRendererTypesAction.loadAppData
      });
  };

  const saveAppData: IntElectronHook["saveAppData"] = data => {
    ipcRenderer &&
      ipcRenderer.send(IpcRendererTypes.database, {
        action: IpcRendererTypesAction.saveAppData,
        data
      });
  };

  return {
    ipcRender,
    loadAppData,
    saveAppData
  };
};

export default useElectronHook;
