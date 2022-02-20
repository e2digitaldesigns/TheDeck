import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import FormFieldKey, { IntFormFieldKeyProps } from "./keyField";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../../theme/theme";

const mocked = {
  onChange: jest.fn(),
  state: {
    profileId: "profileId",
    pageId: "pageId",
    buttonPadId: "buttonPadId",
    _id: "_id",
    order: 2,
    action: "keyTap",
    subAction: "",
    seconds: 0,
    url: "",
    text: "b",
    scene: "",
    layer: "",
    page: "",
    path: "",
    profile: ""
  }
};

const defaultProps = {
  name: "text",
  onChange: mocked.onChange,
  state: mocked.state
};

const testSetup = (props: IntFormFieldKeyProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldKey
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

describe("<FormFieldKey/>", () => {
  it("Should render without errors", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should have default values", () => {
    const label = wrapper.getByTestId("form_field_keyField__label");
    expect(label.innerHTML).toBe("Text:");

    const input = wrapper.getByTestId("form_field_keyField__input");
    expect(input.value).toBe(mocked.state.text);
  });

  it("Should call onChange", () => {
    const input = wrapper.getByTestId("form_field_keyField__input");
    expect(input).toBeTruthy();

    const value = { key: "k", code: "KeyK", charCode: 107 };
    fireEvent.keyPress(input, value);

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith(value.key);
  });

  it("Should call onChange with NumPad Value", () => {
    const input = wrapper.getByTestId("form_field_keyField__input");
    expect(input).toBeTruthy();

    const value = { key: "6", code: "Numpad6", charCode: 54 };
    fireEvent.keyPress(input, value);

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith("numpad_6");
  });
});
