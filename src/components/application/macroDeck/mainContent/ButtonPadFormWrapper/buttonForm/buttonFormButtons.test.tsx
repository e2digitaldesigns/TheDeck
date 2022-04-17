import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ButtonFormButtons from "./buttonFormButtons";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../theme/theme";

import initAppState from "../../../../../../__mock_data__/appState.json";
import initGlobalState from "../../../../../../__mock_data__/globalState.json";

import { IntAppData, IntGlobalData } from "../../../../../../types";

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
  useGlobalData: mockGlobalState,
  getActiveButton: () => mockGlobalState.state.buttonPads[0],
  getActiveButtonIndex: () => 0,
  updateButtonPad: jest.fn(),
  handleFormSubmit: jest.fn(),
  handleResetButtonDefault: jest.fn(),
  handleRevertButtonSaved: jest.fn()
};

jest.mock("../../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,

  useButton: () => ({
    getActiveButton: mockHooks.getActiveButton,
    getActiveButtonIndex: mockHooks.getActiveButtonIndex,
    updateButtonPad: mockHooks.updateButtonPad
  }),

  useGlobalData: () => mockGlobalState
}));

const testSetup = (isDisabled: boolean = false, isVisible: boolean = true) => {
  return render(
    <ThemeProvider theme={theme}>
      <ButtonFormButtons
        defaultElements={{
          textColor: "state.textColor",
          iconColor: "state.iconColor",
          bgColor: "state.bgColor"
        }}
        handleFormSubmit={mockHooks.handleFormSubmit}
        handleResetButtonDefault={mockHooks.handleResetButtonDefault}
        handleRevertButtonSaved={mockHooks.handleRevertButtonSaved}
        isDisabled={isDisabled}
        isVisible={isVisible}
        state={mockGlobalState.state.buttonPads[0]}
      />
    </ThemeProvider>
  );
};

beforeEach(() => {
  mockGlobalState.state = _cloneDeep(initGlobalState);
  mockAppState.appState = _cloneDeep(initAppState);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<ButtonFormButtons/>", () => {
  it("Should render without errors", () => {
    const wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should not show form", () => {
    const wrapper = testSetup(false, false);
    const item = wrapper.getByTestId("button_form_buttons__submit_null");
    expect(item).toBeTruthy();
  });

  it("Should disable submit button", () => {
    const wrapper = testSetup(true);
    const item = wrapper.getByTestId("button_form__submit");
    expect(item).toBeTruthy();
    expect(item).toHaveAttribute("disabled");
  });
});
