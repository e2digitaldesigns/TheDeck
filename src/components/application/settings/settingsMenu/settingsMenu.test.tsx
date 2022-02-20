import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import SettingsMenu from "./settingsMenu";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../theme/theme";

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>
        <SettingsMenu />
      </Router>
    </ThemeProvider>
  );
};

describe("<SettingsMenu />", () => {
  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
