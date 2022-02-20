import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import ProfileProperties from "./profileProperties";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../theme/theme";
import * as hooks from "../../../../../hooks";

const mocked = {
  readProfile: jest.fn(),
  updateProfile: jest.fn()
};

const mockData = {
  profile: {
    _id: "profile-id-001",
    profileName: "001 profile 6 pads",
    buttonPads: 6
  }
};

jest.mock("../../../../../hooks", () => ({
  useProfile: () => ({
    readProfile: () => mockData.profile,
    updateProfile: mocked.updateProfile
  })
}));

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ProfileProperties profileId={mockData.profile._id} />
    </ThemeProvider>
  );
};

let wrapper: any = null;
beforeEach(() => {
  wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<MacroDeck/>", () => {
  it("Should render without errors", () => {
    const component = wrapper;
    expect(component).toMatchSnapshot();
  });

  it("Should accept profile name onChange Event", () => {
    const component = wrapper;
    const input = component.getByTestId("profile_props__profile-name");
    expect(input).toBeTruthy();

    const goodName = "Profile 001";
    fireEvent.change(input, { target: { value: goodName } });
    expect(input.value).toBe(goodName);

    fireEvent.change(input, { target: { value: "?lo()lo*" } });
    expect(input.value).toBe("lolo");
  });

  it("Should accept buttonPad onChange Event", () => {
    const component = wrapper;
    const select = component.getByTestId("profile_props__button-pads");
    expect(select).toBeTruthy();

    fireEvent.change(select, { target: { value: "15" } });
    expect(select.value).toBe("15");
  });

  it("Should accept buttonPad onChange Event", () => {
    const component = wrapper;
    const submit = component.getByTestId("profile_props__submit");
    expect(submit).toBeTruthy();

    const newData = {
      ...mockData.profile,
      profileName: "Boogie",
      buttonPads: 15
    };

    fireEvent.change(component.getByTestId("profile_props__profile-name"), {
      target: { value: newData.profileName }
    });

    fireEvent.change(component.getByTestId("profile_props__button-pads"), {
      target: { value: newData.buttonPads }
    });

    fireEvent.click(submit);

    expect(mocked.updateProfile).toHaveBeenCalledTimes(1);
    expect(mocked.updateProfile).toHaveBeenCalledWith(newData._id, newData);
  });
});
