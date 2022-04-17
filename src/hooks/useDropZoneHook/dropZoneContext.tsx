import { createContext } from "react";
import { IntDragAndDropData, IntDragAndDropInterface } from "../../types";

export const dropZoneDefaultState: IntDragAndDropInterface = {
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

export const DropZoneContext = createContext<IntDragAndDropData>({
  dropZoneState: dropZoneDefaultState,
  setDropZoneState: (): void => {}
});
