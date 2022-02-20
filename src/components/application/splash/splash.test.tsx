import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Splash from "./splash";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme/theme";

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Splash />
    </ThemeProvider>
  );
};

describe("<Splash/>", () => {
  const wrapper = testSetup();
  it("Should render without errors", () => {
    const component = wrapper;
    expect(component).toMatchSnapshot();
  });
});
