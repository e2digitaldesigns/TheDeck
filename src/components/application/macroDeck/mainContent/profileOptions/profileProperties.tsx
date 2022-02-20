import React, { useEffect, useState } from "react";
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import _replace from "lodash/replace";
import _truncate from "lodash/truncate";
import { useProfile } from "../../../../../hooks";
import { ButtonPadNums, IntProfile } from "../../../../../types";
import SETTINGS from "../../../../../settings/system.json";
import * as Styled from "./profileProperties.styles";

export interface IntProfileProperties {
  profileId: string;
}

const ProfileProperties: React.FC<IntProfileProperties> = ({ profileId }) => {
  const { readProfile, updateProfile } = useProfile();
  const [state, setState] = useState<IntProfile>({
    _id: "",
    profileName: "",
    buttonPads: ButtonPadNums.bpn06
  });

  useEffect(() => {
    const profile = readProfile();
    if (state._id !== profile._id) setState(state => profile);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, readProfile]);

  const handleProfileNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newState: IntProfile = _cloneDeep(state);

    let value = _replace(e.target.value, new RegExp(/[^\da-zA-Z-_\s]/g), "");
    value = _truncate(value, {
      length: SETTINGS.APPLICATION.profileNameCharLength,
      omission: ""
    });

    newState.profileName = value;
    setState(newState);
  };

  const handleButtonPadChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newState: IntProfile = _cloneDeep(state);
    newState.buttonPads = parseInt(e.target.value);
    setState(newState);
  };

  const handleSubmit = (): void => {
    updateProfile(state._id, state);
  };

  return (
    <div>
      <Styled.ProfileNameText
        data-testid="profile_props__profile-name"
        type="text"
        value={state.profileName}
        onChange={handleProfileNameChange}
      />
      <Styled.ProfileButtonCountSelect
        data-testid="profile_props__button-pads"
        value={state.buttonPads}
        onChange={handleButtonPadChange}
      >
        {_map(
          SETTINGS.BUTTON_PAD_AMOUNTS,
          (m: number): React.ReactElement => (
            <option key={m} value={m}>
              Button Pads: {m}
            </option>
          )
        )}
      </Styled.ProfileButtonCountSelect>

      <Styled.ProfileSubmit
        data-testid="profile_props__submit"
        onClick={handleSubmit}
      >
        Submit
      </Styled.ProfileSubmit>
    </div>
  );
};

export default ProfileProperties;
