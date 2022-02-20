import React from "react";
import { GlobalContext } from "./globalContext";
import { IntGlobalData } from "../../types";

const useGlobalData = () => {
  const globalData: IntGlobalData = React.useContext(GlobalContext);

  return globalData;
};

export default useGlobalData;
