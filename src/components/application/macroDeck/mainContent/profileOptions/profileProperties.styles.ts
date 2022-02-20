import styled from "styled-components";
import { SubmitButton, SelectField, TextField } from "../../../../../theme/";

export const ProfileNameText = styled(TextField)`
  width: 100%;
  color: #fff;
  font-size: 0.75em;
  border: 0;
`;

export const ProfileButtonCountSelect = styled(SelectField)`
  width: 100%;
  color: #fff;
  font-size: 0.75em;
  border: 0;
`;

export const ProfileSubmit = styled(SubmitButton)`
  float: none;
  padding: 0.25em 0.5em;
  margin: 0;
  padding: 0;
  border-radius: 0.25em;
  font-size: 0.75em;
  min-height: 2em;
  background-color: ${props => props.theme.colors.accent5};
`;
