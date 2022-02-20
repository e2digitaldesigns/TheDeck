import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import SettingsServer from "./settingsServer";
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
      <SettingsServer />
    </ThemeProvider>
  );
};

describe("<SettingsServer />", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should update form fields & submit", async () => {
    const wrapper = setup();
    const port = wrapper.getByTestId(
      "settings_general__port"
    ) as HTMLInputElement;
    expect(port).toBeTruthy();
    expect(port.value).toBe(mockGlobalState.state.settings.port);

    const value = "9586";
    fireEvent.change(port, { target: { value: value } });
    expect(port.value).toBe(value);

    const submit = wrapper.getByTestId("settings_general__submit");
    fireEvent.click(submit);

    await waitFor(() =>
      expect(mockGlobalState.setState).toHaveBeenCalledTimes(1)
    );
  });
});
