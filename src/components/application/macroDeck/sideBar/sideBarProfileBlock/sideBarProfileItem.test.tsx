import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import _size from "lodash/size";

import SideBarProfileItem from "./sideBarProfileItem";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../theme/theme";

import initAppState from "../../../../../__mock_data__/appState.json";
import initDropZoneState from "../../../../../__mock_data__/dropZoneState.json";
import initGlobalState from "../../../../../__mock_data__/globalState.json";

import { IntAppData, IntDropZones, IntGlobalData } from "../../../../../types";

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

const mockedProfile = mockGlobalState.state.profiles[0];

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SideBarProfileItem profile={mockedProfile} />
    </ThemeProvider>
  );
};

const mockHooks = {
  useAppData: mockAppState,
  useDropZone: mockDropZoneState,
  useGlobalData: mockGlobalState,
  createProfile: jest.fn(),
  activateProfile: jest.fn(),
  deleteProfile: jest.fn()
};

jest.mock("../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useDropZone: () => mockHooks.useDropZone,
  useGlobalData: () => mockHooks.useGlobalData,
  useProfile: () => ({
    createProfile: mockHooks.createProfile,
    activateProfile: mockHooks.activateProfile,
    deleteProfile: mockHooks.deleteProfile
  })
}));

let wrapper: any = null;
afterEach(() => {
  wrapper = null;
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("<SideBar/>", () => {
  it("Should render correctly", () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should start drag", () => {
    wrapper = setup();
    const profile = wrapper.getByTestId("side_bar_item__component");
    expect(profile).toBeTruthy();
    expect(profile).toHaveAttribute("draggable");
  });

  it("Should activate profile", () => {
    wrapper = setup();
    const button = wrapper.getByTestId("side_bar_item__component");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(mockHooks.activateProfile).toHaveBeenCalled();
  });

  it("Should show profile name", () => {
    wrapper = setup();
    const profile = wrapper.getByTestId("side_bar_item__profile-name");
    expect(profile.innerHTML).toBe(
      `${mockedProfile.profileName} (${mockedProfile.buttonPads})`.trim()
    );
  });

  it("Should activate profile", () => {
    wrapper = setup();
    const button = wrapper.getByTestId("side_bar_item__profile-activate");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(mockHooks.activateProfile).toHaveBeenCalled();
  });

  it("Should delete profile", () => {
    wrapper = setup();
    const button = wrapper.getByTestId("side_bar_item__profile-delete");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(mockHooks.deleteProfile).toHaveBeenCalled();
  });
});
