import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Iconic, { IntIconProps } from "./icons";

const defaultProps: IntIconProps = {
  icon: "home"
};

const setup = (props: IntIconProps = defaultProps) => {
  return render(
    <Iconic color={props.color} icon={props.icon} size={props.size} />
  );
};

describe("<Iconic/>", () => {
  it("Should render without errors", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it("Should show new attributes", () => {
    const props: IntIconProps = {
      color: "orange",
      icon: "Activity",
      size: "36"
    };
    const component = setup(props);
    const svg = component.queryByTestId(`icon-${props.icon}`);
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("stroke", props.color);
    expect(svg).toHaveAttribute("width", props.size);
  });

  it("Should show home icon (default)", () => {
    const props: IntIconProps = {
      icon: "not-a-real-icon"
    };
    const component = setup(props);
    const svg = component.getByTestId(`icon-Home`);
    expect(svg).toBeTruthy();
  });

  it("Should show letter icon)", () => {
    const props: IntIconProps = {
      icon: "md-icon-alpha-B"
    };
    const component = setup(props);
    const svg = component.getByTestId(`icon-md-icon-alpha-B`);
    expect(svg).toBeTruthy();
  });
});
