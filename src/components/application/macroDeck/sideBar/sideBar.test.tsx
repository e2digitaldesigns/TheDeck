import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import SideBar from "./sideBar";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../theme/theme";

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SideBar />
    </ThemeProvider>
  );
};

describe("<SideBar/>", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
