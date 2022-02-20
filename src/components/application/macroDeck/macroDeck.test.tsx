import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";

import MacroDeck from "./macroDeck";
import { ThemeProvider } from "styled-components";
import { theme } from "./../../../theme/theme";

import initAppState from "../../../__mock_data__/appState.json";
import initGlobalState from "../../../__mock_data__/globalState.json";
import { IntAppData, IntGlobalData } from "../../../types";

const mockAppState: IntAppData = {
  appState: _cloneDeep(initAppState),
  setAppState: jest.fn(appState => appState)
};

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const mockHooks = {
  useAppData: mockAppState,
  useGlobalData: mockGlobalState
};

jest.mock("../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useProfile: () => ({
    activateProfile: jest.fn()
  })
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

xdescribe("<MacroDeck/>", () => {
  it("xxx Should render without errors", () => {
    const component = wrapper;
    expect(component).toMatchSnapshot();
  });
});
