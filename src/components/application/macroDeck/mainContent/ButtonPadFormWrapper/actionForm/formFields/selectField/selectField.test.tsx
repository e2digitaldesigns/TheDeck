import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import FormFieldSelect, { IntFormFieldSelectProps } from "./selectField";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../../../theme/theme";

const mocked = {
  name: "md",
  onChange: jest.fn(),
  state: {
    profileId: "profileId",
    pageId: "pageId",
    buttonPadId: "buttonPadId",
    _id: "_id",
    order: 2,
    action: "",
    subAction: "mdReset",
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
  name: mocked.name,
  onChange: mocked.onChange,
  subAction: mocked.state.subAction
};

const testSetup = (props: IntFormFieldSelectProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldSelect
        name={props.name}
        onChange={props.onChange}
        subAction={props.subAction}
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

  it("Should call onChange", () => {
    const input = wrapper.getByTestId("form_field_selectField__input");
    expect(input).toBeTruthy();

    const value = "mdSettings";
    fireEvent.change(input, { target: { value } });
    expect(mocked.onChange).toHaveBeenCalled();
  });
});
