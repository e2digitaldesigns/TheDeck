import styled from "styled-components";
import { SubmitButton } from "../../../theme";

export const SettingsWrapper = styled.div`
  width: calc(100vw - 1em);
  height: calc(100vh - 3em);
  background-color: #171717;
  border-bottom: 0.0625em solid ${props => props.theme.colors.accent1};
  margin-left: 0.5em;
`;

export const SettingMenuHeader = styled.h1`
  font-size: 1.5em;
  padding: 1em;
`;

export const SettingsMenuList = styled.ul`
  color: #8e8e8e;
  display: flex;
  flex-direction: row;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  border-top: 1px solid #2e2e2e;
  border-bottom: 1px solid #2e2e2e;
  list-style: none;
`;

export const SettingsMenuListItem = styled.li`
  padding: 0 1em;
  a {
    color: #ccc;
    &:hover {
      color: #eee;
    }
  }
`;

export const SettingSwitchContainer = styled.div`
  padding: 1em;
`;

export const SettingFieldset = styled.fieldset`
  border: 0;
  font-size: 0.875em;
`;

export const SettingMenuHeader2 = styled.h2`
  font-size: 1.25em;
  padding-bottom: 0.75em;
`;

export const SettingsFormControlGrid = styled.div`
  display: grid;
  grid-template-columns: 5.5em 10em;
  margin-bottom: 1em;

  label {
    font-size: 0.875em;
  }
  input {
    max-width: 20em;
  }
`;

export const Sumbit = styled(SubmitButton)`
  float: left;
  padding: 0.25em 0.75em;
  margin: 0;
  height: auto;
`;
