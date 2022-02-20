import React from "react";
import { useGlobalData } from "../../../../../hooks";
import { IntStyles } from "../../../../../types";
import _map from "lodash/map";
import SideBarStyleItem from "./sideBarStyleItem";
import * as Styled from "../sideBar.styles";

const MacroDeckStyleSideBar: React.FC<{}> = () => {
  const globalData = useGlobalData();
  const styles = globalData?.state?.styles || [];

  return (
    <>
      <Styled.SideBarListWrapper height="12em">
        <Styled.SideBarListScroll>
          {_map(
            styles,
            (style: IntStyles): React.ReactElement => (
              <SideBarStyleItem key={style._id} style={style} />
            )
          )}
        </Styled.SideBarListScroll>
      </Styled.SideBarListWrapper>
    </>
  );
};

export default MacroDeckStyleSideBar;
