export interface IntAppDataIconSelector {
  isVisible: boolean;
  icon: string;
}

export interface IntAppDataActive {
  profileId: string;
  pageId: string;
  buttonPadId: string;
  actionId: string;
}

export interface IntDropZones {
  actionList: boolean;
  buttonPads: boolean;
  sideBarProfiles: boolean;
  sideBarStyles: boolean;
  styleHeader: boolean;
}

export interface IntAppContextInterface {
  iconSelector: IntAppDataIconSelector;
  active: IntAppDataActive;
  dropZones: IntDropZones;
}

export interface IntAppContextStateInterface {
  appState: IntAppContextInterface;
  setAppState: React.Dispatch<React.SetStateAction<any>>;
}

export type IntAppData = IntAppContextStateInterface;

export enum AppStateActive {
  ProfileId = "profileId",
  PageId = "pageId",
  ButtonPadId = "buttonPadId",
  ActionId = "actionId"
}
