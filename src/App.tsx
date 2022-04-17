import React, { useEffect, useMemo, useRef, useState } from "react";
import _isEqual from "lodash/isEqual";
import _size from "lodash/size";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import * as Styled from "./app.style";
import { window } from "./hooks/useElectronHook/window";

import SETTINGS from "./settings/system.json";

import {
  defaultState,
  GlobalContext
} from "./hooks/useGlobalDataHook/globalContext";

import { appDefaultState, AppContext } from "./hooks/useAppDataHook/appContext";

import {
  dropZoneDefaultState,
  DropZoneContext
} from "./hooks/useDropZoneHook/dropZoneContext";

import {
  IntAppContextInterface,
  IntDragAndDropInterface,
  IntGlobalContextCheckers,
  IntGlobalContextInterface,
  IpcRendererTypes
} from "./types";
import ApplicationWrapper from "./components/application/applicationWrapper/applicationWrapper";

import { useElectron } from "./hooks";
import Splash from "./components/application/splash/splash";
import SoundPlayer from "./components/soundPlayer/soundPlayer";

const ipcRenderer = window?.electron?.ipcRenderer || null;

const App: React.FC = () => {
  const { loadAppData, saveAppData } = useElectron();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [state, setState] = useState<IntGlobalContextInterface>({
    ...defaultState
  });

  const globalContextValue = useMemo(
    () => ({ state, setState }),
    [state, setState]
  );

  const [appState, setAppState] = useState<IntAppContextInterface>({
    ...appDefaultState
  });

  const appContextValue = useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState]
  );

  const [dropZoneState, setDropZoneState] = useState<IntDragAndDropInterface>({
    ...dropZoneDefaultState
  });

  const dropZoneContextValue = useMemo(
    () => ({ dropZoneState, setDropZoneState }),
    [dropZoneState, setDropZoneState]
  );

  useEffect(() => {
    loadAppData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkers = useRef<IntGlobalContextCheckers>({
    profiles: state.profiles,
    pages: state.pages,
    buttonPads: state.buttonPads,
    actions: state.actions,
    styles: state.styles
  });

  useEffect(() => {
    let stillHere = true;

    ipcRenderer &&
      ipcRenderer.on(
        IpcRendererTypes.databaseReturn,
        (e: unknown, data: IntGlobalContextInterface) => {
          if (typeof data === "object" && stillHere) {
            setState(data);
            setIsLoaded(isLoaded => true);
          }
        }
      );

    return () => {
      stillHere = false;
    };
  }, []);

  useEffect(() => {
    let stillHere = true;
    const keys = SETTINGS.SAVE_ON_CHANGE_PARAMS;
    const stateCheck: Partial<IntGlobalContextInterface> = {};
    const refCheck: Partial<IntGlobalContextInterface> = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      refCheck[key as keyof IntGlobalContextInterface] =
        checkers.current[key as keyof IntGlobalContextCheckers];
      stateCheck[key as keyof IntGlobalContextInterface] =
        state[key as keyof IntGlobalContextInterface];
    }

    if (!_isEqual(stateCheck, refCheck)) {
      for (let i = 0; i < _size(keys); i++) {
        checkers.current[keys[i] as keyof IntGlobalContextCheckers] =
          state[keys[i] as keyof IntGlobalContextInterface];
      }

      state?.settings?.ipAddress && stillHere && saveAppData(state);
    }

    return () => {
      stillHere = false;
    };
  }, [state, saveAppData]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Styled.GlobalStyle />
        <GlobalContext.Provider value={globalContextValue}>
          <AppContext.Provider value={appContextValue}>
            <SoundPlayer />
            <DropZoneContext.Provider value={dropZoneContextValue}>
              {isLoaded ? <ApplicationWrapper /> : <Splash />}
            </DropZoneContext.Provider>
          </AppContext.Provider>
        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
