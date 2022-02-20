import "@testing-library/jest-dom";
import useButton from "./useButtonHook";
import initGlobalState from "../../__mock_data__/globalState.json";
import initAppState from "../../__mock_data__/appState.json";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";

import { IntGlobalData, IntAppData, IntActions } from "../../types";

const mockState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const mockAppState: IntAppData = {
  appState: _cloneDeep(initAppState),
  setAppState: jest.fn(appState => appState)
};

const mockAction: IntActions = {
  profileId: "",
  pageId: "",
  buttonPadId: "",
  _id: "new-action-id",
  order: 0,
  action: "md",
  subAction: "",
  seconds: 0,
  url: "",
  text: "",
  scene: "",
  layer: "",
  path: "",
  page: "",
  profile: ""
};

const mockButton = {
  profileId: "",
  pageId: "string",
  _id: "new-button-id",
  buttonPadNum: 0,
  text: "New Button",
  textColor: "#dddddd",
  icon: "",
  iconColor: "defaultColor",
  image: "",
  bgColor: "defaultColor"
};

const mockHooks = {
  useAppData: mockAppState,
  useGlobalData: mockState,
  pageObj: jest.fn(),
  page: { profileId: "", _id: "page-id-002", order: 0 },
  action: {
    ...mockAction
  },
  button: { ...mockButton }
};

jest.mock("./../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useObj: () => ({
    actionObj: () => mockHooks.action,
    pageObj: () => mockHooks.page,
    buttonPadObj: () => mockHooks.button
  })
}));

beforeEach(() => {
  mockState.state = _cloneDeep(initGlobalState);
  mockAppState.appState = _cloneDeep(initAppState);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Use Actions Hook", () => {
  const {
    activateButtonPad,
    createButtonPad,
    readButtonPad,
    getActiveButton,
    updateButtonPad,
    deleteButtonPad
  } = useButton();

  it("Should activate button", () => {
    const buttonPadId = mockState.state.buttonPads[0]._id;
    activateButtonPad(buttonPadId);
    const newGlobalState = { ...mockState.state };
    const newAppState = { ...mockAppState.appState };

    newAppState.active.buttonPadId = buttonPadId;
    newAppState.active.actionId = mockState.state.actions[0]._id;
    expect(mockHooks.useAppData.setAppState).toHaveBeenCalledWith(newAppState);
  });

  it("Should activate button and set no actionId", () => {
    const buttonPadId = mockState.state.buttonPads[1]._id;
    mockState.state.actions = [];
    activateButtonPad(buttonPadId);
    const newAppState = { ...mockAppState.appState };

    newAppState.active.buttonPadId = buttonPadId;
    newAppState.active.actionId = "";
    expect(mockHooks.useAppData.setAppState).toHaveBeenCalledWith(newAppState);
  });

  it("Should NOT activate button", () => {
    const buttonPadId = mockState.state.buttonPads[1]._id;
    mockAppState.appState.active.buttonPadId = buttonPadId;
    activateButtonPad(buttonPadId);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(0);
  });

  it("Should NOT activate button", () => {
    const buttonPadId = mockState.state.buttonPads[1]._id;
    mockAppState.appState.active.buttonPadId = buttonPadId;
    activateButtonPad(buttonPadId);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(0);
  });

  it("Should create a new button", () => {
    mockAppState.appState.active.profileId = "a";
    mockAppState.appState.active.pageId = "b";
    createButtonPad(6);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(1);
  });

  it("Should read buttonPad", () => {
    const button = _cloneDeep(mockState.state.buttonPads[0]);
    mockAppState.appState.active.pageId = button.pageId;
    const buttonPad = readButtonPad(button.buttonPadNum);
    expect(buttonPad).toEqual(button);
  });

  it("Should get active Button", () => {
    const button = _cloneDeep(mockState.state.buttonPads[0]);
    mockAppState.appState.active.buttonPadId = button._id;
    const active = getActiveButton();
    expect(active).toEqual(button);
  });

  it("Should update button", () => {
    const button = _cloneDeep(mockState.state.buttonPads[0]);
    const newText = "XXXXX update XXXXX";
    button.text = newText;
    updateButtonPad(button);

    const newGlobalState = _cloneDeep(mockState.state);
    newGlobalState.buttonPads[0].text = newText;

    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(1);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(
      newGlobalState
    );

    const newAppState = _cloneDeep(mockAppState.appState);
    newAppState.active.buttonPadId = button._id;

    expect(mockHooks.useAppData.setAppState).toHaveBeenCalledTimes(1);
    expect(mockHooks.useAppData.setAppState).toHaveBeenCalledWith(newAppState);
  });

  it("Should NOT update button", () => {
    updateButtonPad(mockButton);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(0);
  });

  it("Should delete button", () => {
    const buttonPadId = mockState.state.buttonPads[0]._id;
    deleteButtonPad(buttonPadId);

    const newGlobalState = _cloneDeep(mockState.state);
    newGlobalState.buttonPads = _filter(
      newGlobalState.buttonPads,
      f => f._id !== buttonPadId
    );
    newGlobalState.actions = _filter(
      newGlobalState.actions,
      f => f.buttonPadId !== buttonPadId
    );

    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledTimes(1);
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(
      newGlobalState
    );
  });
});
