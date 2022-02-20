import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ButtonPadGrid from "./buttonPadGrid";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../theme/theme";

import initAppState from "../../../../../__mock_data__/appState.json";
import initDropZoneState from "../../../../../__mock_data__/dropZoneState.json";
import initGlobalState from "../../../../../__mock_data__/globalState.json";

import { IntAppData, IntGlobalData } from "../../../../../types";

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

const mockHooks = {
  useAppData: mockAppState,
  useDropZone: mockDropZoneState,
  useGlobalData: mockGlobalState,
  pageObj: jest.fn(),
  profileObj: jest.fn()
};

jest.mock("../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useButton: () => ({
    activateButtonPad: jest.fn(),
    createButtonPad: jest.fn(),
    deleteButtonPad: jest.fn(),
    readButtonPad: () => mockGlobalState.state.buttonPads[0]
  }),
  useDropZone: () => mockHooks.useDropZone,
  useGlobalData: () => mockHooks.useGlobalData,
  useProfile: () => ({
    readProfile: () => mockGlobalState.state.profiles[0]
  })
}));

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ButtonPadGrid />
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

describe("<ButtonPadGrid/>", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should show button pad grid", () => {
    mockAppState.appState.active.profileId =
      mockGlobalState.state.profiles[0]._id;
    const wrapper = setup();
    const component = wrapper.getByTestId("button_pad_grid__button-pad");
    expect(component).toBeTruthy();
  });

  it("Should show button pad grid Null", () => {
    mockAppState.appState.active.profileId = "";
    const wrapper = setup();
    const component = wrapper.getByTestId("button_pad_grid__null");
    expect(component).toBeTruthy();
  });
});
