import React from "react";
import { Link } from "react-router-dom";
import * as TYPES from "./../../../../types";

import * as Styled from "./../settings.styles";

interface IntSettingsMenu {}

const SettingsMenu: React.FC<IntSettingsMenu> = () => {
  return (
    <>
      <Styled.SettingMenuHeader>Settings</Styled.SettingMenuHeader>

      <Styled.SettingsMenuList>
        <Styled.SettingsMenuListItem>
          <Link to={`/${TYPES.SectionRoutes.SettingsMacroDeck}`}>
            MacroDeck
          </Link>
        </Styled.SettingsMenuListItem>

        <Styled.SettingsMenuListItem>
          <Link to={`/${TYPES.SectionRoutes.SettingsServer}`}>Server</Link>
        </Styled.SettingsMenuListItem>

        <Styled.SettingsMenuListItem>
          <Link to={`/${TYPES.SectionRoutes.SettingsObs}`}>OBS</Link>
        </Styled.SettingsMenuListItem>

        <Styled.SettingsMenuListItem>
          <Link to={`/${TYPES.SectionRoutes.SettingsTwitch}`}>Twitch</Link>
        </Styled.SettingsMenuListItem>
      </Styled.SettingsMenuList>
    </>
  );
};

export default SettingsMenu;
