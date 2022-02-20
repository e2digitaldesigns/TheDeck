import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ActionList from "./actionList";

import { ThemeProvider } from "styled-components";
import { theme } from "../../../../../../theme/theme";

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ActionList />
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

describe("<ActionList/>", () => {
  it("Should render without errors", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
