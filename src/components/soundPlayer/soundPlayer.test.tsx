import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { window } from "../../hooks/useElectronHook/window";

import SoundPlayer, { playMethod } from "./soundPlayer";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme/theme";

const ipcRenderer = window?.electron?.ipcRenderer || null;

const mocked = {
  ipcRender: jest.fn(),
  ipcRendererOn: jest.fn(),
  ipcRendererSender: jest.fn(),
  saveAs: jest.fn(),
  playMethod: jest.fn()
};

jest.mock("../../hooks/useElectronHook/window", () => ({
  window: {
    electron: {
      ipcRenderer: {
        on: (name: string, method: any) => mocked.ipcRendererOn(name, method),
        removeListener: () => jest.fn(),
        send: (name: string, data: string | object) =>
          mocked.ipcRendererSender(name, data)
      }
    }
  }
}));

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SoundPlayer />
    </ThemeProvider>
  );
};

describe("<SoundPlayer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should have sound player div", () => {
    const wrapper = setup();
    const component = wrapper.getByTestId("sound_player");
    expect(component).toBeTruthy();
  });

  it("Should start IPC Render On", () => {
    setup();
    expect(mocked.ipcRendererOn).toHaveBeenCalledTimes(1);
    expect(mocked.ipcRendererOn).toHaveBeenCalledWith(
      "MD:playSound",
      playMethod
    );
  });
});
