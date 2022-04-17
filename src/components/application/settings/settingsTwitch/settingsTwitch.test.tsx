import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import SettingsTwitch from "./settingsTwitch";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../theme/theme";

import initGlobalState from "../../../../__mock_data__/globalState.json";
import { IntGlobalData } from "../../../../types";

const mockGlobalState: IntGlobalData = {
  state: _cloneDeep(initGlobalState),
  setState: jest.fn(state => state)
};

jest.mock("../../../../hooks", () => ({
  useAppData: () => ({ appState: { dropZones: { buttonPads: false } } }),
  useButton: () => ({
    activateButtonPad: jest.fn(),
    createButtonPad: jest.fn(),
    deleteButtonPad: jest.fn(),
    readButtonPad: () => mockGlobalState.state.buttonPads[0]
  }),
  useGlobalData: () => mockGlobalState,
  useProfile: () => ({
    readProfile: () => mockGlobalState.state.profiles[0]
  })
}));

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SettingsTwitch />
    </ThemeProvider>
  );
};

describe("<SettingsTwitch />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should update form fields & submit", async () => {
    const wrapper = setup();

    const status = wrapper.getByTestId(
      "settings_twitch__status"
    ) as HTMLInputElement;
    expect(status).toBeTruthy();
    expect(status.value).toBe(
      mockGlobalState.state.settings.features.twitch.status
    );

    const val = "0";
    fireEvent.change(status, { target: { value: val } });
    expect(status.value).toBe(val);

    const channel = wrapper.getByTestId(
      "settings_twitch__channels"
    ) as HTMLInputElement;
    expect(channel).toBeTruthy();
    expect(channel.value).toBe(
      mockGlobalState.state.settings.features.twitch.channels
    );

    const value = "new name";
    fireEvent.change(channel, { target: { value: value } });
    expect(channel.value).toBe(value);

    const submit = wrapper.getByTestId("settings_twitch__submit");
    fireEvent.click(submit);

    await waitFor(() =>
      expect(mockGlobalState.setState).toHaveBeenCalledTimes(1)
    );
  });
});
