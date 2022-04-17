import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import _size from "lodash/size";

import SideBarProfiles from "./sideBarProfiles";
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

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SideBarProfiles />
    </ThemeProvider>
  );
};

const mockHooks = {
  useAppData: mockAppState,
  useGlobalData: mockGlobalState,
  createProfile: jest.fn()
};

jest.mock("../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useGlobalData: () => mockHooks.useGlobalData,
  useProfile: () => ({
    createProfile: mockHooks.createProfile
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

  it("Should show profiles", () => {
    wrapper = setup();
    const profiles = wrapper.getAllByTestId("side_bar_item__component");
    expect(_size(profiles)).toBe(_size(mockGlobalState.state.profiles));
  });
});
