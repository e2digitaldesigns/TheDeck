import React, { useEffect, useState } from "react";
import { useGlobalData } from "../../../../hooks";
import _cloneDeep from "lodash/cloneDeep";

import * as Styled from "../settings.styles";

const SettingsTwitch: React.FC = () => {
  const globalData = useGlobalData();
  const [twitchState, setTwitchState] = useState({
    status: 0,
    channels: ""
  });

  useEffect(() => {
    console.log(19, globalData?.state?.settings?.features?.twitch);
    setTwitchState(twitchState => ({
      ...twitchState,
      ...globalData?.state?.settings?.features?.twitch
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTwitchState({ ...twitchState, [name]: value });
  };

  const handleSubmit = async () => {
    const state = _cloneDeep(globalData.state);
    state.settings.features.twitch = { ...twitchState };
    globalData.setState(state);
  };

  return (
    <Styled.SettingSwitchContainer>
      <Styled.SettingFieldset>
        <Styled.SettingMenuHeader2>Twitch Settings</Styled.SettingMenuHeader2>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_twitch__status">Username:</label>
          <select
            data-testid="settings_twitch__status"
            name="status"
            onChange={e => handleOnChange(e)}
            value={twitchState?.status}
          >
            <option value={1}>Active</option>
            <option value={0}>In-Active</option>
          </select>
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_twitch__channels">Username:</label>
          <input
            data-testid="settings_twitch__channels"
            name="channels"
            onChange={e => handleOnChange(e)}
            type="text"
            value={twitchState?.channels}
          />
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <span />
          <span>
            <Styled.Sumbit
              data-testid="settings_twitch__submit"
              onClick={handleSubmit}
            >
              Submit
            </Styled.Sumbit>
          </span>
        </Styled.SettingsFormControlGrid>
      </Styled.SettingFieldset>
    </Styled.SettingSwitchContainer>
  );
};

export default SettingsTwitch;
