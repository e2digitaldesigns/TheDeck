import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import PageSelect from "./pageSelect";
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
  appState: initAppState,
  setAppState: jest.fn(appState => appState)
};

const mocked = {
  usePage: {
    activatePage: jest.fn(),
    createPage: jest.fn(),
    deletePage: jest.fn(),
    readPages: initGlobalState.pages
  }
};

jest.mock("../../../../../hooks", () => ({
  useAppData: () => mockAppState,
  useGlobalData: () => mockGlobalState,
  usePage: () => ({
    activatePage: mocked.usePage.activatePage,
    createPage: mocked.usePage.createPage,
    deletePage: mocked.usePage.deletePage,
    readPages: () => ({ ...mocked.usePage.readPages })
  })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <PageSelect />
    </ThemeProvider>
  );
};

let wrapper: any = null;

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<PageSelect/>", () => {
  it("Should render without errors", () => {
    const component = testSetup();
    expect(component).toMatchSnapshot();
  });

  it("Should change page", () => {
    const component = testSetup();
    const select = component.getByTestId("page_select__select");
    expect(select).toBeTruthy();

    const page = mockGlobalState.state.pages[2];
    fireEvent.change(select, { target: { value: page._id } });
    expect(mocked.usePage.activatePage).toHaveBeenCalledTimes(1);
    expect(mocked.usePage.activatePage).toHaveBeenCalledWith(page._id);
  });

  it("Should delete page", () => {
    mockAppState.appState.active.pageId = mockGlobalState.state.pages[2]._id;
    const component = testSetup();
    const btn = component.getByTestId("page_select__remove");
    expect(btn).toBeTruthy();

    fireEvent.click(btn);
    expect(mocked.usePage.deletePage).toHaveBeenCalledTimes(1);
  });

  it("Should close icon page", () => {
    mockAppState.appState.iconSelector.isVisible = true;
    mockAppState.appState.active.pageId = mockGlobalState.state.pages[2]._id;
    const component = testSetup();
    const btn = component.getByTestId("page_select__close_icon");
    expect(btn).toBeTruthy();

    fireEvent.click(btn);
    expect(mockAppState.setAppState).toHaveBeenCalledTimes(1);
  });
});
