import React, { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Delete, Edit } from "@material-ui/icons";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { IntProfile } from "../../../../../types";
import { useAppData, useProfile, useGlobalData } from "../../../../../hooks";
import * as Styled from "./../sideBarItem.styles";

export interface IntSideBarProfileItem {
  profile: IntProfile;
}

const SideBarProfileItem: React.FC<IntSideBarProfileItem> = ({ profile }) => {
  const globalData = useGlobalData();
  const { appState } = useAppData();
  const { activateProfile, deleteProfile } = useProfile();
  const profileItemRef = useRef<HTMLDivElement>(null);

  const handleProfileActivate = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    profile?._id && activateProfile(profile?._id);
  };

  const handleProfileDelete = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    profile?._id && deleteProfile(profile?._id);
  };

  useEffect(() => {
    const handleDragStart = (e: any) => {
      e.dataTransfer.setData("dndAction", "sideBarProfileSort");
      e.dataTransfer.setData("dragId", profile._id);
    };

    profileItemRef?.current?.addEventListener("dragstart", handleDragStart);
  }, [profileItemRef, profile._id]);

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = async (e: any, _id: string) => {
    const dragId = e.dataTransfer.getData("dragId");

    const newState = _cloneDeep(globalData.state);
    const dragIndex = _findIndex(
      newState.profiles,
      (f: any) => f._id === dragId
    );
    const dropIndex = _findIndex(newState.profiles, (f: any) => f._id === _id);
    const dragProfile = newState.profiles[dragIndex];

    if (dragIndex > dropIndex) {
      newState.profiles.splice(dragIndex, 1);
      newState.profiles.splice(dropIndex, 0, dragProfile);
    }

    if (dragIndex < dropIndex) {
      newState.profiles.splice(dropIndex + 1, 0, dragProfile);
      newState.profiles.splice(dragIndex, 1);
    }

    if (dragIndex !== dropIndex) globalData.setState(newState);
  };

  return (
    <Styled.ItemGrid
      active={appState?.active?.profileId === profile._id}
      data-testid="side_bar_item__component"
      draggable={true}
      onClick={handleProfileActivate}
      onDragOver={e => allowDrop(e)}
      onDrop={e => handleDrop(e, profile._id)}
      ref={profileItemRef}
    >
      <div data-testid="side_bar_item__profile-name">
        {profile.profileName} ({profile.buttonPads})
      </div>

      <div
        data-testid="side_bar_item__profile-activate"
        onClick={handleProfileActivate}
      >
        <Edit fontSize="inherit" />
      </div>

      <div
        data-testid="side_bar_item__profile-delete"
        onClick={handleProfileDelete}
      >
        <Delete fontSize="inherit" />
      </div>
    </Styled.ItemGrid>
  );
};

export default SideBarProfileItem;
