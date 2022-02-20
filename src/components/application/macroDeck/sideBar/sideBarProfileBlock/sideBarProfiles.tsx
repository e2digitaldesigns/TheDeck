import React from "react";
import { useGlobalData } from "../../../../../hooks";
import { IntProfile } from "../../../../../types";
import _map from "lodash/map";
import SideBarProfileItem from "./sideBarProfileItem";
import * as Styled from "../sideBar.styles";

const MacroDeckProfileSideBar: React.FC<{}> = () => {
  const globalData = useGlobalData();
  const profiles = globalData?.state?.profiles || [];

  return (
    <>
      <Styled.SideBarListWrapper>
        <Styled.SideBarListScroll>
          {_map(
            profiles,
            (profile: IntProfile): React.ReactElement => (
              <SideBarProfileItem key={profile._id} profile={profile} />
            )
          )}
        </Styled.SideBarListScroll>
      </Styled.SideBarListWrapper>
    </>
  );
};

export default MacroDeckProfileSideBar;
