import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import IconSelector from "./iconSelector";

import { ThemeProvider } from "styled-components";
import { theme } from "./../../../../../../../theme/theme";

import initAppState from "../../../../../../../__mock_data__/appState.json";
import initGlobalState from "../../../../../../../__mock_data__/globalState.json";

import { IntAppData, IntGlobalData } from "../../../../../../../types";

import ICONS from "../../../../../../../utils/icons/featherIconDb.json";

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
  handleSelectIcon: jest.fn()
};

jest.mock("../../../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,

  useButton: () => ({
    getActiveButton: mockHooks.getActiveButton,
    getActiveButtonIndex: mockHooks.getActiveButtonIndex,
    updateButtonPad: mockHooks.updateButtonPad
  }),

  useGlobalData: () => mockGlobalState
}));

const testSetup = (isVisible: boolean = true) => {
  return render(
    <ThemeProvider theme={theme}>
      <IconSelector
        handleSelectIcon={mockHooks.handleSelectIcon}
        isVisible={isVisible}
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

describe("<IconSelector/>", () => {
  it("Should render without errors", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render empty div", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup(false);
    const component = wrapper.queryByTestId("icon-selector__search-field");
    expect(component).not.toBeTruthy();
  });

  it("Should render empty div", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId(
      "icon-selector__search-field"
    ) as HTMLInputElement;
    expect(textField).toBeTruthy();

    const value = "chill";
    fireEvent.change(textField, { target: { value } });
    expect(textField.value).toBe(value);
  });

  it("Should close selector with no icon selected", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const noneButton = wrapper.getByTestId("icon-selector__none");
    expect(noneButton).toBeTruthy();

    fireEvent.click(noneButton);

    const newAppState = _cloneDeep(mockAppState.appState);
    newAppState.iconSelector.isVisible = false;
    expect(mockAppState.setAppState).toHaveBeenCalled();
    expect(mockAppState.setAppState).toHaveBeenCalledWith(newAppState);

    expect(mockHooks.handleSelectIcon).toHaveBeenCalled();
    expect(mockHooks.handleSelectIcon).toHaveBeenCalledWith("");
  });

  it("Should close selector with selected icon", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const iconButtons = wrapper.getAllByTestId("icon-selector__icons");
    const index = 25;

    expect(iconButtons[index]).toBeTruthy();

    fireEvent.click(iconButtons[index]);

    const newAppState = _cloneDeep(mockAppState.appState);
    newAppState.iconSelector.isVisible = false;
    expect(mockAppState.setAppState).toHaveBeenCalled();
    expect(mockAppState.setAppState).toHaveBeenCalledWith(newAppState);

    expect(mockHooks.handleSelectIcon).toHaveBeenCalled();
    expect(mockHooks.handleSelectIcon).toHaveBeenCalledWith(
      ICONS[index].display
    );
  });

  it("Should close selector", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const closeBtn = wrapper.getByTestId("icon-selector__close");

    expect(closeBtn).toBeTruthy();

    fireEvent.click(closeBtn);

    const newAppState = _cloneDeep(mockAppState.appState);
    newAppState.iconSelector.isVisible = false;
    expect(mockAppState.setAppState).toHaveBeenCalled();
    expect(mockAppState.setAppState).toHaveBeenCalledWith(newAppState);
  });
});
