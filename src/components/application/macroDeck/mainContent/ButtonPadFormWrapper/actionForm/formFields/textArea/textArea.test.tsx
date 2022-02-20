import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import _upperFirst from "lodash/upperFirst";
import FormFieldTextArea, { IntFormFieldTextAreaProps } from "./textArea";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../../theme/theme";

const mocked = {
  name: "text",
  onChange: jest.fn(),
  state: {
    profileId: "profileId",
    pageId: "pageId",
    buttonPadId: "buttonPadId",
    _id: "_id",
    order: 2,
    action: "twitter",
    subAction: "",
    seconds: 0,
    url: "",
    text: "send this tweet",
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

const testSetup = (props: IntFormFieldTextAreaProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldTextArea
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

describe("<FormFieldSelect/>", () => {
  it("Should render without errors", () => {
    const component = testSetup(defaultProps);
    expect(component).toMatchSnapshot();
  });

  it("Should have default values", () => {
    const label = wrapper.getByTestId("form_field_textArea__label");
    expect(label).toBeTruthy();
    expect(label.innerHTML).toBe(_upperFirst(mocked.name) + ":");

    const input = wrapper.getByTestId("form_field_textArea__input");
    expect(input).toBeTruthy();
    expect(input.value).toBe(mocked.state.text);
  });

  it("Should call onChange", () => {
    const input = wrapper.getByTestId("form_field_textArea__input");
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: "chill" } });
    expect(mocked.onChange).toHaveBeenCalled();
  });
});
