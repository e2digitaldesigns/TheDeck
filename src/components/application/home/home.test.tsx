import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "./home";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme/theme";

const testSetup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Home />
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
