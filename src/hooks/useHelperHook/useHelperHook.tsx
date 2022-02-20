import _findIndex from "lodash/findIndex";
import { useAppData, useGlobalData } from "../";

import { AppStateActive, IntGlobalData, IntAppData } from "../../types";

export interface IntUseHelperHook {
  getActive: (active: AppStateActive) => any;
  getProfileIndex: () => number;
  valueFinder: (dataSet: any, searchTerm: string, result: any) => any;
}

const useHelperHook = (): IntUseHelperHook => {
  const globalData: IntGlobalData = useGlobalData();
  const appData: IntAppData = useAppData();

  const getActive = (active: AppStateActive) => {
    return appData?.appState.active?.[active];
  };

  const getProfileIndex = (): number => {
    const index = _findIndex(globalData?.state?.profiles, (f: any) => {
      return f._id === globalData?.state?.active?.profileId;
    });

    return index;
  };

  const valueFinder = (
    dataSet: any,
    searchTerm: string,
    result: any = []
  ): any => {
    const param = "_id";
    Object.keys(dataSet).forEach(key => {
      if (typeof dataSet[key] === "object") {
        valueFinder(dataSet[key], searchTerm, result);
      }

      if (
        typeof dataSet[key] === "string" &&
        dataSet[key] === searchTerm &&
        key === param
      ) {
        result.push(dataSet);
      }
    });

    return result;
  };

  return {
    getActive,
    getProfileIndex,
    valueFinder
  };
};

export default useHelperHook;
