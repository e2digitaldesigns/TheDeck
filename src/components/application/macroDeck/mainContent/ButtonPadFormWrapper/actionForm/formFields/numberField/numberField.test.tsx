import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import _upperFirst from "lodash/upperFirst";

import FormFieldNumbers, { IntFormFieldNumbersProps } from "./numberField";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../../theme/theme";

const mocked = {
  name: "seconds",
  onChange: jest.fn(),
  seconds: true,
  state: {
    profileId: "profileId",
    pageId: "pageId",
    buttonPadId: "buttonPadId",
    _id: "_id",
    order: 2,
    action: "delay",
    subAction: "",
    seconds: 0,
    url: "",
    text: "",
    scene: "",
    layer: "",
    page: "",
    path: "",
    profile: ""
  }
};

let defaultProps = {
  name: mocked.name,
  onChange: mocked.onChange,
  seconds: mocked.seconds,
  state: mocked.state
};

const testSetup = (props: IntFormFieldNumbersProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldNumbers
        name={props.name}
        onChange={props.onChange}
        seconds={props.seconds}
        state={props.state}
      />
    </ThemeProvider>
  );
};

let wrapper: any = null;
beforeEach(() => {});

afterEach(() => {
  wrapper = null;
  jest.resetAllMocks();
  jest.clearAllMocks();

  defaultProps = {
    name: mocked.name,
    onChange: mocked.onChange,
    seconds: mocked.seconds,
    state: mocked.state
  };
});

describe("<FormFieldNumbers/>", () => {
  it("Should render without errors", () => {
    wrapper = testSetup(defaultProps);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should have default values", () => {
    wrapper = testSetup(defaultProps);
    const label = wrapper.getByTestId("form_field_numberField__label");
    expect(label.innerHTML).toBe(_upperFirst(mocked.name) + ":");

    const input = wrapper.getByTestId("form_field_numberField__input");
    expect(input.value).toBe(mocked.state.seconds.toString());
  });

  it("Should call onChange", () => {
    wrapper = testSetup(defaultProps);
    const input = wrapper.queryByTestId("form_field_numberField__input");
    fireEvent.change(input, { target: { value: "3500" } });
    expect(mocked.onChange).toHaveBeenCalledTimes(1);
  });

  it("Should have base options", () => {
    defaultProps.seconds = false;
    wrapper = testSetup(defaultProps);
    const options = wrapper.queryAllByTestId("form_field_numberField__options");
    expect(options[0].value).toBe("0");
  });

  it("Should multiply options by 1000", () => {
    wrapper = testSetup(defaultProps);
    const options = wrapper.queryAllByTestId("form_field_numberField__options");
    expect(options[1].value).toBe("500");
  });
});
