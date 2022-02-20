import React from "react";
import MacroDeckSideBarProfileHeader from "./sideBarProfileBlock/sideBarProfileBlockHeader";
import MacroDeckProfileSideBar from "./sideBarProfileBlock/sideBarProfiles";

import MacroDeckSideBarStyleHeader from "./sideBarStyleBlock/sideBarStyleHeader";
import MacroDeckStyleSideBar from "./sideBarStyleBlock/sideBarStyles";

const MacroDeckSideBar: React.FC<{}> = () => {
  return (
    <>
      <MacroDeckSideBarProfileHeader />

      <MacroDeckProfileSideBar />

      <MacroDeckSideBarStyleHeader />

      <MacroDeckStyleSideBar />
    </>
  );
};

export default MacroDeckSideBar;
