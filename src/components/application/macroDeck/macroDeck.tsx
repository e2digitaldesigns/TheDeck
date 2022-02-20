import React, { useEffect } from "react";
import * as Styled from "./macroDeck.styles";
import MacroDeckSideBar from "./sideBar/sideBar";
import ButtonPadGrid from "./mainContent/buttonPadGrid/buttonPadGrid";
import OptionHeader from "./mainContent/profileOptions/profileOptions";
import ButtonPadFormWrapper from "./mainContent/ButtonPadFormWrapper/buttonPadWrapper";
import { useAppData, useGlobalData, useProfile } from "../../../hooks";

const MacroDeck: React.FC<{}> = () => {
  const { appState } = useAppData();
  const { state } = useGlobalData();
  const { activateProfile } = useProfile();

  useEffect(() => {
    if (!appState.active?.profileId && state.profiles?.[0]._id) {
      activateProfile(state.profiles[0]._id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Styled.MacroGrid>
        <div />
        <Styled.SideBar>
          <MacroDeckSideBar />
        </Styled.SideBar>
        <div />
        <Styled.MainContent>
          <ButtonPadGrid />
          <OptionHeader />

          <ButtonPadFormWrapper />
        </Styled.MainContent>
        <div />
      </Styled.MacroGrid>
    </>
  );
};

export default MacroDeck;
