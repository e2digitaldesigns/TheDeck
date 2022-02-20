import "@testing-library/jest-dom";
import { window } from "../../../../hooks/useElectronHook/window";
import { createEvent, fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import SettingsMacroDeck from "./settingsMacroDeck";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../theme/theme";

import initGlobalState from "../../../../__mock_data__/globalState.json";
import { IntGlobalData } from "../../../../types";

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const mocked = {
  ipcRender: jest.fn(),
  ipcRendererOn: jest.fn(),
  ipcRendererSender: jest.fn(),
  saveAs: jest.fn()
};

jest.mock("../../../../hooks/useElectronHook/window", () => ({
  window: {
    electron: {
      ipcRenderer: {
        on: () => mocked.ipcRendererOn(),
        removeListener: () => jest.fn(),
        send: (name: string, data: string | object) =>
          mocked.ipcRendererSender(name, data)
      }
    }
  }
}));

jest.mock("../../../../hooks", () => ({
  useAppData: () => ({ appState: { dropZones: { buttonPads: false } } }),
  useButton: () => ({
    activateButtonPad: jest.fn(),
    createButtonPad: jest.fn(),
    deleteButtonPad: jest.fn(),
    readButtonPad: () => mockGlobalState.state.buttonPads[0]
  }),
  useElectron: () => ({
    ipcRender: mocked.ipcRender
  }),
  useGlobalData: () => mockGlobalState,
  useProfile: () => ({
    readProfile: () => mockGlobalState.state.profiles[0]
  })
}));

jest.mock("file-saver", () => ({
  saveAs: () => mocked.saveAs()
}));

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SettingsMacroDeck />
    </ThemeProvider>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("<SettingsMacroDeck />", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start IPC Render On", () => {
    setup();
    expect(mocked.ipcRendererOn).toHaveBeenCalledTimes(1);
  });

  it("Should export data", () => {
    const wrapper = setup();
    const buttonExport = wrapper.getByTestId(
      "settings_macro_deck__export-button"
    );
    expect(buttonExport).toBeTruthy();
    fireEvent.click(buttonExport);
    expect(mocked.saveAs).toHaveBeenCalledTimes(1);
  });

  it("Should import data", () => {
    const wrapper = setup();
    const filePath = "cool/and/the/gang.music";

    const inputFile = wrapper.getByTestId(
      "settings_macro_deck__import-input"
    ) as HTMLInputElement;
    expect(inputFile).toBeTruthy();

    const importBtn = wrapper.getByTestId("settings_macro_deck__import-button");
    expect(importBtn).toBeTruthy();

    fireEvent(
      inputFile,
      createEvent("input", inputFile, {
        target: { files: filePath }
      })
    );

    expect(inputFile.files).toBe(filePath);

    fireEvent.click(importBtn);
    expect(mocked.ipcRender).toHaveBeenCalledTimes(1);
    expect(mocked.ipcRender).toHaveBeenCalledWith("importSettings", {
      filePath: undefined,
      importType: "local"
    });
  });
});
