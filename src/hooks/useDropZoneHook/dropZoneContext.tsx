import { createContext } from "react";

export const dropZoneDefaultState: any = {
  iconSelector: {
    isVisible: false,
    icon: ""
  },
  dropZones: {
    actionList: false,
    buttonPads: false,
    sideBarProfiles: false,
    sideBarStyles: false,
    styleHeader: false
  }
};

export const DropZoneContext = createContext<any>({
  dropZoneState: dropZoneDefaultState,
  setDropZoneState: (): void => {}
});
