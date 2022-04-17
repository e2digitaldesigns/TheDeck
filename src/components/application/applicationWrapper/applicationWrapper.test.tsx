import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import ApplicationWrapper from "./applicationWrapper";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme/theme";

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ApplicationWrapper />
    </ThemeProvider>
  );
};

describe("<ApplicationWrapper />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
