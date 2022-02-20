import React, { useEffect } from "react";
import { useElectron, useGlobalData } from "../../../../hooks";
import { window } from "../../../../hooks/useElectronHook/window";
import _cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

import * as Styled from "../settings.styles";
import { IpcRendererTypes } from "../../../../types";

const ipcRenderer = window?.electron?.ipcRenderer || null;

const SettingsMacroDeck: React.FC = () => {
  const globalData = useGlobalData();
  const { ipcRender } = useElectron();

  useEffect(() => {
    if (!ipcRenderer) return;

    const handleReturn = (e: any, data: any) => {
      data?.err && toast.error(data.err);
    };

    ipcRenderer.on(IpcRendererTypes.importSettingsReturn, handleReturn);

    return () => {
      ipcRenderer.removeListener(
        IpcRendererTypes.importSettingsReturn,
        handleReturn
      );
    };
  }, []);

  const handleExportSubmit = () => {
    const state = _cloneDeep(globalData.state);
    const exportFile = new File(
      [JSON.stringify(state)],
      "macro-deck-data.json",
      {
        type: "application/json; charset=utf-8"
      }
    );
    saveAs(exportFile);
  };

  const handleImportSubmit = () => {
    const file: any = document.getElementById("importSettingsFile");
    const filePath = file?.files?.[0]?.path;

    ipcRender(IpcRendererTypes.importSettings, {
      importType: "local",
      filePath
    });
  };

  return (
    <Styled.SettingSwitchContainer>
      <Styled.SettingFieldset>
        <button
          data-testid="settings_macro_deck__export-button"
          onClick={handleExportSubmit}
        >
          Export
        </button>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <input
          id="importSettingsFile"
          data-testid="settings_macro_deck__import-input"
          type="file"
          accept=".json"
        ></input>

        <button
          data-testid="settings_macro_deck__import-button"
          onClick={handleImportSubmit}
        >
          Import
        </button>
      </Styled.SettingFieldset>
    </Styled.SettingSwitchContainer>
  );
};

export default SettingsMacroDeck;
