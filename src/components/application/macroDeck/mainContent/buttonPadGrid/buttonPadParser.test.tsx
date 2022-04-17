import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import ButtonPadParser from "./buttonPadParser";
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

const mockHooks = {
  useAppData: mockAppState,
  useDropZone: mockDropZoneState,
  useGlobalData: mockGlobalState,
  activateButtonPad: jest.fn(),
  createButtonPad: jest.fn(),
  copyState: {
    buttonPad: {
      bgColor: "buttonPad.bgColor",
      icon: "buttonPad.icon",
      iconColor: "buttonPad.iconColor",
      text: "buttonPad.text",
      textColor: "buttonPad.textColor"
    },
    actions: []
  },
  deleteButtonPad: jest.fn(),
  handleButtonCopy: jest.fn(),
  pasteButtonPad: jest.fn(),
  readButtonPad: () => mockGlobalState.state.buttonPads[0]
};

jest.mock("../../../../../hooks", () => ({
  useAppData: () => mockHooks.useAppData,
  useButton: () => ({
    activateButtonPad: mockHooks.activateButtonPad,
    createButtonPad: mockHooks.createButtonPad,
    deleteButtonPad: mockHooks.deleteButtonPad,
    pasteButtonPad: mockHooks.pasteButtonPad,
    readButtonPad: mockHooks.readButtonPad
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
      <ButtonPadParser
        copyState={mockHooks.copyState}
        handleButtonCopy={mockHooks.handleButtonCopy}
        padNumber={1}
      />
    </ThemeProvider>
  );
};

beforeEach(() => {
  mockAppState.appState = _cloneDeep(initAppState);
  mockDropZoneState.dropZoneState = _cloneDeep(initDropZoneState);
  mockGlobalState.state = _cloneDeep(initGlobalState);
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  cleanup;
});

describe("<ButtonPadParser/>", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.getByTestId("button_pad_parser__button-inner")).toBeTruthy();
  });

  it("Should call deleteButtonPad", () => {
    const wrapper = setup();
    const component = wrapper.getByTestId("button_pad_parser__option-delete");
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.deleteButtonPad).toHaveBeenCalledTimes(1);
    expect(mockHooks.deleteButtonPad).toHaveBeenCalledWith(
      mockGlobalState.state.buttonPads[0]._id
    );
  });

  it("Should call activateButtonPad", () => {
    const wrapper = setup();
    const component = wrapper.getByTestId("button_pad_parser__option-edit");
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.activateButtonPad).toHaveBeenCalledTimes(1);
    expect(mockHooks.activateButtonPad).toHaveBeenCalledWith(
      mockGlobalState.state.buttonPads[0]._id
    );
  });

  it("Should call activateButtonPad", () => {
    mockGlobalState.state.buttonPads = [];
    const wrapper = setup();
    const component = wrapper.getByTestId("button_pad_parser__create");
    expect(component).toBeTruthy();

    fireEvent.click(component);
    expect(mockHooks.createButtonPad).toHaveBeenCalledTimes(1);
    expect(mockHooks.createButtonPad).toHaveBeenCalledWith(1);
  });
});

describe("<ButtonPadParser/> Drag & Drop", () => {
  it("Should start drag", () => {
    const wrapper = setup();
    const newDropZoneState = _cloneDeep(mockDropZoneState.dropZoneState);
    const buttonPad = wrapper.getByTestId("button_pad_parser__button-inner");

    expect(buttonPad).toBeTruthy();
    expect(buttonPad).toHaveAttribute("draggable");

    fireEvent.dragStart(buttonPad);
    newDropZoneState.dropZones.buttonPads = true;
    newDropZoneState.dropZones.styleHeader = true;

    expect(mockDropZoneState.setDropZoneState).toHaveBeenCalledTimes(1);
    expect(mockDropZoneState.setDropZoneState).toHaveBeenCalledWith(
      newDropZoneState
    );

    fireEvent.dragEnd(buttonPad);
    newDropZoneState.dropZones.buttonPads = false;
    newDropZoneState.dropZones.styleHeader = false;
    expect(mockDropZoneState.setDropZoneState).toHaveBeenCalledTimes(2);
    expect(mockDropZoneState.setDropZoneState).toHaveBeenCalledWith(
      newDropZoneState
    );
  });
});

describe("<ButtonPadParser/> Copy & Paste", () => {
  it("Should copy button", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;

    const wrapper = setup();
    const copyButton = wrapper.getByTestId("button_pad_parser__option-copy");
    expect(copyButton).toBeTruthy();

    fireEvent.click(copyButton);
    expect(mockHooks.handleButtonCopy).toHaveBeenCalledTimes(1);
    expect(mockHooks.handleButtonCopy).toHaveBeenCalledWith(
      mockGlobalState.state.buttonPads[0]
    );
  });

  it("Should paste button", () => {
    mockAppState.appState.active.buttonPadId =
      mockGlobalState.state.buttonPads[0]._id;

    const wrapper = setup();
    const pasteButton = wrapper.getByTestId("button_pad_parser__option-paste");
    expect(pasteButton).toBeTruthy();

    fireEvent.click(pasteButton);
    expect(mockHooks.pasteButtonPad).toHaveBeenCalledTimes(1);
    expect(mockHooks.pasteButtonPad).toHaveBeenCalledWith(
      mockGlobalState.state.buttonPads[0],
      mockHooks.copyState
    );
  });
});
