import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import _size from "lodash/size";

import MacroDeckSideBarProfileHeader from "./sideBarProfileBlockHeader";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../theme/theme";

import initGlobalState from "../../../../../__mock_data__/globalState.json";
import { IntGlobalData } from "../../../../../types";

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <MacroDeckSideBarProfileHeader />
    </ThemeProvider>
  );
};

const mockHooks = {
  useGlobalData: mockGlobalState,
  createProfile: jest.fn()
};

jest.mock("../../../../../hooks", () => ({
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

  it("Should show profile count", () => {
    wrapper = setup();
    const profileCount = wrapper.getByTestId("sidebar-header__profile-count");
    expect(profileCount).toBeTruthy();
    expect(profileCount.innerHTML).toBe(
      _size(mockGlobalState.state.profiles).toString()
    );
  });

  it("Should create new profile", async () => {
    wrapper = setup();
    const button = wrapper.getByTestId("sidebar-header__new-profile-button");
    expect(button).toBeTruthy();
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockHooks.createProfile).toHaveBeenCalledTimes(1)
    );
  });
});
