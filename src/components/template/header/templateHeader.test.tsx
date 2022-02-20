import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import TemplateHeader from "./templateHeader";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./../../../theme/theme";
import * as TYPES from "./../../../types";

const mockHooks = {
  ipcRender: jest.fn()
};

jest.mock("../../../hooks", () => ({
  useElectron: () => ({
    ipcRender: mockHooks.ipcRender
  })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>
        <TemplateHeader />
      </Router>
    </ThemeProvider>
  );
};

let wrapper: any = null;
beforeEach(() => {
  wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<TemplateHeader/>", () => {
  it("Should render without errors", () => {
    const component = wrapper;
    expect(component).toMatchSnapshot();
  });

  it("Should render correctly", () => {
    const component = wrapper.getByTestId("template_header__component");
    expect(component).toBeTruthy();
  });

  it("Should call IpcRenderer Minimize", () => {
    const component = wrapper.getByTestId("template_header__minimize-button");

    expect(component).toBeTruthy();
    fireEvent.click(component);
    expect(mockHooks.ipcRender).toHaveBeenCalledTimes(1);
    expect(mockHooks.ipcRender).toHaveBeenCalledWith(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.minimize
    );
  });

  it("Should call IpcRenderer Fullscreen", () => {
    const component = wrapper.getByTestId("template_header__fs-button");
    expect(component).toBeTruthy();
    fireEvent.click(component);

    expect(mockHooks.ipcRender).toHaveBeenCalledTimes(1);
    expect(mockHooks.ipcRender).toHaveBeenCalledWith(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.fsToggle
    );

    const fsExit = wrapper.getByTestId("template_header__fs-exit-button");
    expect(fsExit).toBeVisible();
    fireEvent.click(fsExit);

    expect(mockHooks.ipcRender).toHaveBeenCalledTimes(2);
    expect(mockHooks.ipcRender).toHaveBeenCalledWith(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.fsToggle
    );
  });

  it("Should call IpcRenderer Close Application", () => {
    const component = wrapper.getByTestId("template_header__close-button");

    expect(component).toBeTruthy();
    fireEvent.click(component);
    expect(mockHooks.ipcRender).toHaveBeenCalledTimes(1);
    expect(mockHooks.ipcRender).toHaveBeenCalledWith(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.close
    );
  });
});
