import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ProfileOptions from "./profileOptions";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../theme/theme";
import initGlobalState from "../../../../../__mock_data__/globalState.json";
import initAppState from "../../../../../__mock_data__/appState.json";
import _cloneDeep from "lodash/cloneDeep";

import { IntAppData, IntGlobalData } from "../../../../../types";

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const mockAppState: IntAppData = {
  appState: _cloneDeep(initAppState),
  setAppState: jest.fn(appState => appState)
};

jest.mock("../../../../../hooks", () => ({
  __esModule: true,
  useAppData: () => mockAppState,
  useGlobalData: () => mockGlobalState,
  useObj: () => ({
    pageObj: jest.fn()
  }),
  usePage: () => ({
    activatePage: jest.fn(),
    createPage: jest.fn(),
    deletePage: jest.fn(),
    readPages: jest.fn()
  }),
  useProfile: () => ({
    readProfile: () => mockGlobalState.state.profiles[1],
    updateProfile: jest.fn()
  })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ProfileOptions />
    </ThemeProvider>
  );
};

beforeEach(() => {
  mockAppState.appState = _cloneDeep(initAppState);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<ProfileOptions/>", () => {
  it("Should render without errors", () => {
    mockAppState.appState.active.profileId =
      mockGlobalState.state.profiles[1]._id;
    const wrapper = testSetup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should show application", () => {
    mockAppState.appState.active.profileId =
      mockGlobalState.state.profiles[1]._id;
    const wrapper = testSetup();
    const component = wrapper.getByTestId(
      "profile_options__page-header-wrapper"
    );
    expect(component).toBeTruthy();
  });

  it("Should NOT show application", () => {
    const wrapper = testSetup();
    const component = wrapper.getByTestId("profile_options__not-loaded");
    expect(component).toBeTruthy();
  });
});
