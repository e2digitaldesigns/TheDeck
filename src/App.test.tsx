import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import App from "./App";

const setup = () => {
  return render(<App />);
};

describe("<App />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Should render correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
