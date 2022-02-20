import React from "react";
import * as Icon from "react-feather";
import _find from "lodash/find";
import _startsWith from "lodash/startsWith";
import * as Styed from "./icons.style";

export interface IntIconProps {
  color?: string;
  icon: string;
  size?: number | string;
}

const Iconic: React.FC<IntIconProps> = ({
  icon,
  color = "white",
  size = 24
}): React.ReactElement => {
  if (_startsWith(icon, "md-icon-alpha-")) {
    return (
      <Styed.MdIcon color={color}>
        {icon.split("md-icon-alpha-")[1]}
      </Styed.MdIcon>
    );
  }

  const defaultIcon = Icon.Home;
  const TheIcon =
    _find(Icon, (f: any) => f.displayName === icon) || defaultIcon;

  return (
    <TheIcon
      data-testid={`icon-${TheIcon.displayName}`}
      color={color}
      size={size}
    />
  );
};

export default Iconic;
