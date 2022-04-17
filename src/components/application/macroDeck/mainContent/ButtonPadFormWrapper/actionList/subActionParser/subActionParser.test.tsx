import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import SubActionParser from "./subActionParser";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../theme/theme";

import initAppState from "../../../../../../../__mock_data__/appState.json";
import initGlobalState from "../../../../../../../__mock_data__/globalState.json";
import {
  IntActions,
  IntAppData,
  IntGlobalData
} from "../../../../../../../types";

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
  usePage: {
    readPage: jest.fn()
  },
  useProfile: {
    readProfile: jest.fn()
  },
  pageObj: {
    number: 4
  },
  profileObj: { profileName: "profileName" }
};

jest.mock("../../../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useActions: () => ({
    activateAction: mockHooks.useActions.activateAction,
    createAction: mockHooks.useActions.createAction,
    deleteAction: mockHooks.useActions.deleteAction
  }),
  usePage: () => ({
    readPage: mockHooks.usePage.readPage.mockImplementation(
      () => mockHooks.pageObj
    )
  }),
  useProfile: () => ({
    readProfile: mockHooks.useProfile.readProfile.mockImplementation(
      () => mockHooks.profileObj
    )
  })
}));

const testSetup = (action: IntActions) => {
  return render(
    <ThemeProvider theme={theme}>
      <SubActionParser action={action} />
    </ThemeProvider>
  );
};

const mockedActionsBase = {
  ...mockGlobalState.state.actions[1],
  order: 0,
  action: "",
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

describe("<SubActionParser/>", () => {
  it("Should render without errors", () => {
    wrapper = testSetup({
      ...mockedActionsBase,
      action: "obs",
      subAction: "obsStreamToggle"
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("Should return API URL", () => {
    const action = "api";
    const url = "url";
    wrapper = testSetup({ ...mockedActionsBase, action, url });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(url);
  });

  it("Should return black API URL", () => {
    const action = "api";
    const url = "";
    wrapper = testSetup({ ...mockedActionsBase, action, url });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(url);
  });

  it("Should return Delay", () => {
    const action = "delay";
    const seconds = 5,
      wrapper = testSetup({ ...mockedActionsBase, action, seconds });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`${seconds} seconds`);
  });

  it("Should return 0 Delay", () => {
    const action = "delay";
    const seconds = 0;
    wrapper = testSetup({ ...mockedActionsBase, action, seconds });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`0 seconds`);
  });

  it("Should return EXE", () => {
    const action = "exe";
    const path = "this-is-the-path";
    wrapper = testSetup({ ...mockedActionsBase, action, path });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(path);
  });

  it("Should return blank EXE", () => {
    const action = "exe";
    const path = "";
    wrapper = testSetup({ ...mockedActionsBase, action, path });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(path);
  });

  it("Should return Sound", () => {
    const action = "sound";
    const path = "this-is-the-path";
    wrapper = testSetup({ ...mockedActionsBase, action, path });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(path);
  });

  it("Should return blank Sound", () => {
    const action = "sound";
    const path = "";
    wrapper = testSetup({ ...mockedActionsBase, action, path });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(path);
  });

  it("Should return KeyTap", () => {
    const action = "keyTap";
    const char = "X";
    wrapper = testSetup({ ...mockedActionsBase, action, text: char });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(char);
  });

  it("Should return KeyTap", () => {
    const action = "keyTap";
    const char = "";
    wrapper = testSetup({ ...mockedActionsBase, action, text: char });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(char);
  });

  it("Should return Home", () => {
    const action = "mdHome";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("Home");
  });

  it("Should return Page", () => {
    const action = "mdPage";
    const page = "pageID";
    wrapper = testSetup({ ...mockedActionsBase, action, page });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Go to Page ${mockHooks.pageObj.number}`);
  });

  it("Should return Blank Page", () => {
    const action = "mdPage";
    const page = "";
    wrapper = testSetup({ ...mockedActionsBase, action, page });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("");
  });

  it("Should return Profile", () => {
    const action = "mdProfile";
    const profile = "profileID";
    wrapper = testSetup({ ...mockedActionsBase, action, profile });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Go to ${mockHooks.profileObj.profileName}`);
  });

  it("Should return Profile Selector", () => {
    const action = "mdProfileSelector";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("Profile Selection Page");
  });

  it("Should return Reset", () => {
    const action = "mdReset";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("Reset Mobile App");
  });

  it("Should return Settings", () => {
    const action = "mdSettings";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("Settings");
  });

  it("Should return Layer to hide", () => {
    const action = "obsLayerHide";
    const layer = "layer";
    wrapper = testSetup({ ...mockedActionsBase, action, layer });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Layer: ${layer}`);
  });

  it("Should return Layer to show", () => {
    const action = "obsLayerShow";
    const layer = "layer";
    wrapper = testSetup({ ...mockedActionsBase, action, layer });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Layer: ${layer}`);
  });

  it("Should return Layer to toggle", () => {
    const action = "obsLayerToggle";
    const layer = "layer";
    wrapper = testSetup({ ...mockedActionsBase, action, layer });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Layer: ${layer}`);
  });

  it("Should return OBS Record Start", () => {
    const action = "obsRecordStart";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Record Start");
  });

  it("Should return OBS Record Stop", () => {
    const action = "obsRecordStop";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Record Stop");
  });

  it("Should return OBS Record Toggle", () => {
    const action = "obsRecordToggle";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Record Toggle");
  });

  it("Should return OBS Record Pause", () => {
    const action = "obsRecordPause";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Record Pause");
  });

  it("Should return OBS Record Resume", () => {
    const action = "obsRecordResume";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Record Resume");
  });

  it("Should return OBS Scene Change", () => {
    const action = "obsSceneChange";
    const scene = "chill";
    wrapper = testSetup({ ...mockedActionsBase, action, scene });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe(`Scene: ${scene}`);
  });

  it("Should return OBS Stream Start", () => {
    const action = "obsStreamStart";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Stream Start");
  });

  it("Should return OBS Stream Stop", () => {
    const action = "obsStreamStop";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Stream Stop");
  });

  it("Should return OBS Stream Toggle", () => {
    const action = "obsStreamToggle";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("OBS Stream Toggle");
  });

  it("Should return Blank", () => {
    const action = "";
    wrapper = testSetup({ ...mockedActionsBase, action });
    const text = wrapper.getByTestId("sub-action-parser__text");
    expect(text).toBeTruthy();
    expect(text.innerHTML).toBe("");
  });
});
