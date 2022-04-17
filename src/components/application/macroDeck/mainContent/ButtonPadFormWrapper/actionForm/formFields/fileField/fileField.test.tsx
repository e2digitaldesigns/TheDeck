import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import FormFieldFile, { IntFormFieldFileProps } from "./fileField";
import { FormFieldFileTypes } from "../../../../../../../../types";

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

const defaultProps: IntFormFieldFileProps = {
  name: "text",
  onChange: mocked.onChange,
  id: FormFieldFileTypes.FileField
};

const testSetup = (props: IntFormFieldFileProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <FormFieldFile
        name={props.name}
        onChange={props.onChange}
        id={props.id}
      />
    </ThemeProvider>
  );
};

let wrapper: any = null;
beforeEach(() => {});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<FormFieldFile/>", () => {
  it("Should render without errors", () => {
    wrapper = testSetup(defaultProps);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should have default values", () => {
    wrapper = testSetup(defaultProps);
    const label = wrapper.getByTestId("form_field_fileField__label");
    expect(label.innerHTML).toBe("Text:");
  });

  it("Should call onChange FileField", () => {
    wrapper = testSetup(defaultProps);
    const input = wrapper.getByTestId("form_field_fileField__input");
    expect(input).toBeTruthy();

    const file = "this-file.exe";
    fireEvent.change(input, { target: { files: [file] } });

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith(defaultProps.id);
  });

  it("Should call onChange EXE", () => {
    defaultProps.id = FormFieldFileTypes.MDFileFieldExe;
    wrapper = testSetup(defaultProps);
    const input = wrapper.getByTestId("form_field_fileField__input");
    expect(input).toBeTruthy();

    const file = "this-file.exe";
    fireEvent.change(input, { target: { files: [file] } });

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith(defaultProps.id);
  });

  it("Should call onChange Sound", () => {
    defaultProps.id = FormFieldFileTypes.MDFileFieldSound;
    wrapper = testSetup(defaultProps);
    const input = wrapper.getByTestId("form_field_fileField__input");
    expect(input).toBeTruthy();

    const file = "this-file.exe";
    fireEvent.change(input, { target: { files: [file] } });

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith(defaultProps.id);
  });

  it("Should call onChange with Defaults", () => {
    delete defaultProps.id;
    delete defaultProps.name;
    wrapper = testSetup(defaultProps);

    const label = wrapper.getByTestId("form_field_fileField__label");
    expect(label.innerHTML).toBe("Path:");

    const input = wrapper.getByTestId("form_field_fileField__input");
    expect(input).toBeTruthy();

    const file = "this-file.exe";
    fireEvent.change(input, { target: { files: [file] } });

    expect(mocked.onChange).toHaveBeenCalledTimes(1);
    expect(mocked.onChange).toHaveBeenCalledWith(FormFieldFileTypes.FileField);
  });
});
