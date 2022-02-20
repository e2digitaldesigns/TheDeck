import { createContext } from "react";
import { IntGlobalData, IntGlobalContextInterface } from "../../types";

export const defaultState: IntGlobalContextInterface = {
  userInformation: { _id: "", name: "" },
  templateInformation: { sideBarState: "" },
  settings: {
    ipAddress: "",
    port: "",
    features: {
      obs: {},
      twitch: {
        status: "",
        channel: "icon33"
      }
    }
  },
  active: {
    profileId: "",
    pageId: "",
    buttonPadId: "",
    actionId: ""
  },
  profiles: [],
  pages: [],
  buttonPads: [],
  actions: [],
  styles: []
};

export const GlobalContext = createContext<IntGlobalData>({
  state: defaultState,
  setState: (): void => {}
});
