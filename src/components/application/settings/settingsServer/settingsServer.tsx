import React, { useEffect, useState } from "react";
import { useGlobalData } from "../../../../hooks";
import _cloneDeep from "lodash/cloneDeep";
import _replace from "lodash/replace";
import _truncate from "lodash/truncate";
import SETTINGS from "../../../../settings/system.json";

import * as Styled from "../settings.styles";

const SettingsGeneral: React.FC = () => {
  const globalData = useGlobalData();
  const [portState, setPortState] = useState({ port: "" });
  const portCharLength = SETTINGS.APPLICATION.portNumberCharLength;

  useEffect(() => {
    setPortState(portState => ({
      ...portState,
      port: globalData?.state?.settings?.port
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = _replace(e.target.value, new RegExp(/[^\d]/g), "");
    value = _truncate(value, {
      length: portCharLength,
      omission: ""
    });
    setPortState({ ...portState, port: value });
  };

  const handleSubmit = async () => {
    const state = _cloneDeep(globalData.state);
    state.settings.port = portState.port;
    globalData.setState(state);
  };

  const showServerLink = !!globalData.state.settings.port;
  const serverLink = `http://${globalData.state.settings.ipAddress}:${globalData.state.settings.port}`;

  return (
    <Styled.SettingSwitchContainer>
      <Styled.SettingFieldset>
        <Styled.SettingMenuHeader2>Server Settings</Styled.SettingMenuHeader2>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_general__ipAddress">IP Address:</label>
          <span>{globalData.state.settings.ipAddress}</span>
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <label htmlFor="settings_general__port">Port:</label>
          <input
            data-testid="settings_general__port"
            name="settings_general__port"
            onChange={e => handleOnChange(e)}
            type="text"
            value={portState.port || ""}
          />
        </Styled.SettingsFormControlGrid>
        {showServerLink && (
          <Styled.SettingsFormControlGrid>
            <span />
            <span>{serverLink}</span>
          </Styled.SettingsFormControlGrid>
        )}

        <Styled.SettingsFormControlGrid>
          <span />
          <span>
            You will need to restart this application after changing the Port
            Number.
          </span>
        </Styled.SettingsFormControlGrid>

        <Styled.SettingsFormControlGrid>
          <span />
          <span>
            <Styled.Sumbit
              data-testid="settings_general__submit"
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

export default SettingsGeneral;
