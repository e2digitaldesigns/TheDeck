import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import _cloneDeep from "lodash/cloneDeep";
import SettingsObs from "./settingsObs";
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
      <SettingsObs />
    </ThemeProvider>
  );
};

const formFieldTest = (wrapper: any, testId: string, newValue: string) => {
  const component = wrapper.getByTestId(`settings_obs__${testId}`);
  expect(component).toBeTruthy();
  expect(component.value).toBe(
    mockGlobalState.state.settings.features.obs[testId]
  );
  fireEvent.change(component, { target: { value: newValue } });
  expect(component.value).toBe(newValue);
};

describe("<SettingsObs />", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should update form fields & submit", async () => {
    const wrapper = setup();
    const submit = wrapper.getByTestId("settings_obs__submit");

    formFieldTest(wrapper, "status", "0");
    formFieldTest(wrapper, "ipAddress", "10.10.10.10");
    formFieldTest(wrapper, "port", "9568");
    formFieldTest(wrapper, "password", "GEToVERhere");

    fireEvent.click(submit);

    await waitFor(() =>
      expect(mockGlobalState.setState).toHaveBeenCalledTimes(1)
    );
  });
});
