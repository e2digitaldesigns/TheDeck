import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import FormFieldText, { IntFormFieldTextProps } from "./textField";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../../theme/theme";

const mocked = {
  name: "url",
  onChange: jest.fn(),
  state: {
    profileId: "profileId",
    pageId: "pageId",
    buttonPadId: "buttonPadId",
    _id: "_id",
    order: 2,
    action: "api",
    subAction: "",
    seconds: 0,
    url: "this-is-the-api",
    text: "",
    scene: "",
    layer: "",
    page: "",
    path: "",
    profile: ""
  }
};

const defaultProps = {
  name: mocked.name,
  onChange: mocked.onChange,
  state: mocked.state
};

const testSetup = (props: IntFormFieldTextProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldText
        name={props.name}
        onChange={props.onChange}
        state={props.state}
      />
    </ThemeProvider>
  );
};

let wrapper: any = null;
beforeEach(() => {
  wrapper = testSetup(defaultProps);
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<FormFieldText/>", () => {
  it("Should render without errors", () => {
    const component = testSetup(defaultProps);
    expect(component).toMatchSnapshot();
  });

  it("Should show default values", () => {
    const label = wrapper.getByTestId("form_field_textField__label");
    expect(label).toBeTruthy();
    expect(label.innerHTML).toBe("Url:");
  });

  it("Should change onChange", async () => {
    const input = wrapper.getByTestId("form_field_textField__input");
    fireEvent.change(input, { target: { value: "ppppp" } });
    expect(mocked.onChange).toHaveBeenCalled();
  });
});
