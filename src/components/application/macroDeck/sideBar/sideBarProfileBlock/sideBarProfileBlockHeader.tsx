import * as React from "react";
import _size from "lodash/size";
import { AddCircleOutline, FileCopy } from "@material-ui/icons";
import { useGlobalData, useProfile } from "../../../../../hooks";
import * as Styled from "./../sideBarHeader.styles";

export enum SideBarType {
  Profile = "profiles",
  Styles = "styles"
}
export interface IntSideBarProfileBlockHeader {}

const MacroDeckSideBarProfileHeader: React.FC<IntSideBarProfileBlockHeader> =
  () => {
    const globalData = useGlobalData();
    const { createProfile } = useProfile();
    const data = globalData?.state?.profiles || [];
    const dataSize = _size(data);
    const header = "PROFILES";

    return (
      <>
        <Styled.HeaderGrid data-testid="sidebar_header__component">
          <Styled.ProfileHeader>
            <Styled.Icon>
              <FileCopy fontSize="inherit" />
            </Styled.Icon>
            <div>
              {header} (
              <span data-testid="sidebar-header__profile-count">
                {dataSize}
              </span>
              )
            </div>
            <Styled.SuffixIcon>
              <AddCircleOutline
                data-testid="sidebar-header__new-profile-button"
                fontSize="inherit"
                onClick={createProfile}
              />
            </Styled.SuffixIcon>
          </Styled.ProfileHeader>

          <div className="profile-search-wrapper"></div>
        </Styled.HeaderGrid>
      </>
    );
  };

export default MacroDeckSideBarProfileHeader;
