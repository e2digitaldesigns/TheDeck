import React, { useEffect, useState } from "react";
import { useGlobalData } from "../../../../hooks";
import _cloneDeep from "lodash/cloneDeep";
import _replace from "lodash/replace";
import _truncate from "lodash/truncate";
import SETTINGS from "../../../../settings/system.json";

import * as Styled from "../settings.styles";

const SettingsObs: React.FC = () => {
  const globalData = useGlobalData();
  const [obsState, setObsState] = useState({
    status: "0",
    ipAddress: "",
    port: "",
    password: ""
  });

  useEffect(() => {
    setObsState({ ...globalData.state?.settings?.features?.obs });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setObsState({ ...obsState, [e.target.name]: e.target.value });
  };

  const handleOnChangeIpAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = _replace(e.target.value, new RegExp(/[^\d .]/g), "");
    setObsState({ ...obsState, [e.target.name]: value });
  };

  const handleOnChangePort = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = _replace(e.target.value, new RegExp(/[^\d]/g), "");
    value = _truncate(value, {
      length: SETTINGS.APPLICATION.portNumberCharLength,
      omission: ""
    });
    setObsState({ ...obsState, port: value });
  };

  const handleSubmit = async () => {
    const state = _cloneDeep(globalData.state);
    state.settings.features.obs = obsState;
    globalData.setState(state);
  };

  return (
    <Styled.SettingSwitchContainer>
      <Styled.SettingFieldset>
        <Styled.SettingMenuHeader2>OBS Settings</Styled.SettingMenuHeader2>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_obs__status">Status:</label>
          <select
            data-testid="settings_obs__status"
            name="status"
            onChange={e => handleOnChange(e)}
            value={obsState.status}
          >
            <option value="1">On</option>
            <option value="0">Off</option>
          </select>
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_obs__ipAddress">IP Address:</label>
          <input
            data-testid="settings_obs__ipAddress"
            name="ipAddress"
            onChange={handleOnChangeIpAddress}
            type="text"
            value={obsState.ipAddress}
          />
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_obs__port">Port:</label>
          <input
            data-testid="settings_obs__port"
            name="port"
            onChange={e => handleOnChangePort(e)}
            type="text"
            value={obsState.port}
          />
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_obs__password">Password:</label>
          <input
            data-testid="settings_obs__password"
            name="password"
            onChange={handleOnChange}
            type="password"
            value={obsState.password}
          />
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <span />
          <span>
            <Styled.Sumbit
              data-testid="settings_obs__submit"
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

export default SettingsObs;
