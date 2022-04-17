import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";

import MacroDeck from "./macroDeck";
import { ThemeProvider } from "styled-components";
import { theme } from "./../../../theme/theme";

import initAppState from "../../../__mock_data__/appState.json";
import initDropZoneState from "../../../__mock_data__/dropZoneState.json";
import initGlobalState from "../../../__mock_data__/globalState.json";
import { IntAppData, IntGlobalData } from "../../../types";
import useDropZone from "./../../../hooks/useDropZoneHook/useDropZoneHook";

const mockAppState: IntAppData = {
  appState: _cloneDeep(initAppState),
  setAppState: jest.fn(appState => appState)
};

const mockDropZoneState: any = {
  dropZoneState: _cloneDeep(initDropZoneState),
  setDropZoneState: jest.fn(dropZoneState => dropZoneState)
};

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const mockHooks = {
  useAppData: mockAppState,
  useDropZone: mockDropZoneState,
  useGlobalData: mockGlobalState
};

jest.mock("../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useProfile: () => ({
    activateProfile: jest.fn(),
    readProfile: jest.fn()
  }),
  useDropZone: () => mockHooks.useDropZone,
  useActions: () => ({
    activateAction: jest.fn(),
    createAction: jest.fn(),
    getActions: jest.fn(),
    deleteAction: jest.fn()
  }),
  useButton: () => ({
    getActiveButton: jest.fn(),
    getActiveButtonIndex: jest.fn(),
    updateButtonPad: jest.fn()
  }),
  useStyles: () => jest.fn()
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <MacroDeck />
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

describe("<MacroDeck/>", () => {
  it("xxx Should render without errors", () => {
    const component = wrapper;
    expect(component).toMatchSnapshot();
  });
});
