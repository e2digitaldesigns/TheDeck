import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ActionForm from "./actionForm";
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
    deleteAction: jest.fn(),
    getAction: jest.fn(),
    getActions: jest.fn(),
    updateAction: jest.fn()
  },
  actionItem: mockGlobalState.state.actions[0]
};

jest.mock("../../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useActions: () => ({
    activateAction: mockHooks.useActions.activateAction,
    createAction: mockHooks.useActions.createAction,
    getAction: mockHooks.useActions.getAction.mockImplementation(
      () => mockHooks.actionItem
    ),
    updateAction: mockHooks.useActions.updateAction,
    getActions: mockHooks.useActions.getActions.mockImplementation(() => [
      mockHooks.actionItem
    ]),
    deleteAction: mockHooks.useActions.deleteAction
  }),
  useObs: () => ({
    getScenes: () => [],
    getSources: () => []
  }),
  usePage: () => jest.fn(),

  useProfile: () => ({ readProfile: jest.fn() })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ActionForm />
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
  mockGlobalState.state = _cloneDeep(initGlobalState);
  jest.resetAllMocks();
  jest.clearAllMocks();
  cleanup;
});

describe("<ActionFormwp/>", () => {
  xit("Should render without errors", () => {
    wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  xit("Should change action", () => {
    mockAppState.appState.active.actionId =
      mockGlobalState.state.actions[5]._id;
    wrapper = testSetup();
    const select = wrapper.getByTestId("action-form__action");
    expect(select).toBeTruthy();

    const actions = ["api", "delay", "exe", "sound", "keyTap", "md", "obs"];

    actions.forEach(action => {
      fireEvent.change(select, { target: { value: action } });
      expect(select.value).toBe(action);
    });
  });

  xit("Should change action", () => {
    mockAppState.appState.active.actionId =
      mockGlobalState.state.actions[0]._id;
    wrapper = testSetup();
  });
});
