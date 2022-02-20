import React from "react";
import { Outlet } from "react-router-dom";

import * as Styled from "./settings.styles";
import SettingsMenu from "./settingsMenu/settingsMenu";

const Settings: React.FC = () => {
  return (
    <Styled.SettingsWrapper>
      <SettingsMenu />

      <Outlet />
    </Styled.SettingsWrapper>
  );
};

export default Settings;
