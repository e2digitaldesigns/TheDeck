import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ButtonForm from "./buttonForm";

import { ThemeProvider } from "styled-components";
import { theme } from "./../../../../../../theme/theme";

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
  updateButtonPad: jest.fn()
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

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ButtonForm />
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

describe("<ButtonForm/>", () => {
  it("Should render without errors", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should enter text in text field", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId(
      "button_form__text-field-text"
    ) as HTMLInputElement;
    expect(textField).toBeTruthy();

    const value = "Hello";
    fireEvent.change(textField, { target: { value } });
    expect(textField.value).toBe(value);
  });

  it("Should enter text validation", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId(
      "button_form__text-field-text"
    ) as HTMLInputElement;
    expect(textField).toBeTruthy();

    const value = "H!!!ello Hell^%^o He@l#";
    const check = "Hello Hello Hel";
    fireEvent.change(textField, { target: { value } });
    expect(textField.value).toBe(check);
  });

  it("Should change text color", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textColor = wrapper.getByTestId(
      "button_form__text-field-text-color"
    ) as HTMLInputElement;
    expect(textColor).toBeTruthy();

    const value = "#111111";
    fireEvent.change(textColor, { target: { value } });
    expect(textColor.value).toBe(value);
  });

  it("Should change bg color", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const bgColor = wrapper.getByTestId(
      "button_form__bg-color"
    ) as HTMLInputElement;
    expect(bgColor).toBeTruthy();

    const value = "#111111";
    fireEvent.change(bgColor, { target: { value } });
    expect(bgColor.value).toBe(value);
  });

  it("Should use default bgColor", () => {
    const wrapper = testSetup();
    const bgColor = wrapper.getByTestId(
      "button_form__bg-color"
    ) as HTMLInputElement;
    expect(bgColor.value).toBe("#555555");
  });

  it("Should use button bgColor", () => {
    mockGlobalState.state.buttonPads[0].bgColor = "#ffffff";
    const wrapper = testSetup();
    const bgColor = wrapper.getByTestId(
      "button_form__bg-color"
    ) as HTMLInputElement;
    expect(bgColor.value).toBe("#ffffff");
  });

  it("Should have disabled buttons", () => {
    const wrapper = testSetup();

    const submitButton = wrapper.getByTestId("button_form__submit");
    expect(submitButton).toBeTruthy();
    expect(submitButton).toHaveAttribute("disabled");

    const resetButton = wrapper.getByTestId("button_form__reset");
    expect(resetButton).toBeTruthy();
    expect(resetButton).toHaveAttribute("disabled");

    const revertButton = wrapper.getByTestId("button_form__revert");
    expect(revertButton).toBeTruthy();
    expect(revertButton).toHaveAttribute("disabled");
  });

  it("Should have enabled buttons", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();

    const submitButton = wrapper.getByTestId("button_form__reset");
    expect(submitButton).toBeTruthy();
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  it("Should submit form", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId("button_form__text-field-text");
    const submit = wrapper.getByTestId("button_form__submit");

    fireEvent.change(textField, { target: { value: "go go go" } });
    fireEvent.click(submit);
    expect(mockHooks.updateButtonPad).toHaveBeenCalledTimes(1);
  });

  it("Should revert to saved", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId(
      "button_form__text-field-text"
    ) as HTMLInputElement;
    const revertButton = wrapper.getByTestId("button_form__revert");
    fireEvent.change(textField, { target: { value: "go go go" } });
    fireEvent.click(revertButton);
    expect(textField.value).toBe(mockGlobalState.state.buttonPads[0].text);
  });

  it("Should reset default", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;
    const wrapper = testSetup();
    const textField = wrapper.getByTestId(
      "button_form__text-field-text"
    ) as HTMLInputElement;
    const resetButton = wrapper.getByTestId("button_form__reset");
    fireEvent.change(textField, { target: { value: "going going gone" } });
    fireEvent.click(resetButton);
    expect(textField.value).toBe(mockGlobalState.state.buttonPads[0].text);
  });
});
