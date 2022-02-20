import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { window } from "../../hooks/useElectronHook/window";

import SoundPlayer from "./soundPlayer";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme/theme";

const mocked = {
  ipcRender: jest.fn(),
  ipcRendererOn: jest.fn(),
  ipcRendererSender: jest.fn(),
  saveAs: jest.fn()
};

jest.mock("../../hooks/useElectronHook/window", () => ({
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

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SoundPlayer />
    </ThemeProvider>
  );
};

describe("<SoundPlayer />", () => {
  xit("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render correctly", () => {
    const wrapper = setup();
    expect(mocked.ipcRendererOn).toHaveBeenCalledWith();
  });
});
