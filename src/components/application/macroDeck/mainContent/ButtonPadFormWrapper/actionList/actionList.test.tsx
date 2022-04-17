import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ActionList from "./actionList";
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
  useActions: {
    activateAction: jest.fn(),
    createAction: jest.fn(),
    getActions: jest.fn(),
    deleteAction: jest.fn()
  },
  actionItem: mockGlobalState.state.actions[1]
};

jest.mock("../../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useActions: () => ({
    activateAction: mockHooks.useActions.activateAction,
    createAction: mockHooks.useActions.createAction,
    getActions: mockHooks.useActions.getActions.mockImplementation(() => [
      mockHooks.actionItem
    ]),
    deleteAction: mockHooks.useActions.deleteAction
  }),
  usePage: () => jest.fn(),

  useProfile: () => ({ readProfile: jest.fn() })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ActionList />
    </ThemeProvider>
  );
};

let wrapper: any = null;

beforeEach(() => {
  // wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  mockAppState.appState = _cloneDeep(initAppState);
  jest.resetAllMocks();
  jest.clearAllMocks();
  cleanup;
});

describe("<ActionList/>", () => {
  it("Should render without errors", () => {
    wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should call getActions", () => {
    wrapper = testSetup();
    expect(mockHooks.useActions.getActions).toHaveBeenCalled();
  });

  it("Should call activateAction", () => {
    wrapper = testSetup();
    const component = wrapper.queryByTestId(
      "action-list__action-item-activate"
    );
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.useActions.activateAction).toHaveBeenCalledTimes(1);
    expect(mockHooks.useActions.activateAction).toHaveBeenCalledWith(
      mockHooks.actionItem._id
    );
  });

  it("Should call createAction", () => {
    mockAppState.appState.active.buttonPadId = mockHooks.actionItem.buttonPadId;
    wrapper = testSetup();

    const component = wrapper.getByTestId("action-list__action-item-new");
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.useActions.createAction).toHaveBeenCalledTimes(1);
  });

  it("Should call deleteAction", () => {
    wrapper = testSetup();

    const component = wrapper.getByTestId("action-list__action-item-delete");
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.useActions.deleteAction).toHaveBeenCalledTimes(1);
    expect(mockHooks.useActions.deleteAction).toHaveBeenCalledWith(
      mockHooks.actionItem._id
    );
  });

  it("Should Not call createAction", () => {
    wrapper = testSetup();
    const component = wrapper.getByTestId("action-list__action-item-new");
    expect(component).toBeTruthy();
    expect(component).toHaveAttribute("disabled");

    fireEvent.click(component);
    expect(mockHooks.useActions.createAction).toHaveBeenCalledTimes(0);
  });
});
