import styled from "styled-components";
import { SubmitButton, SelectField } from "../../../../../theme/";

export const HeaderSelect = styled(SelectField)`
  float: right;
  padding: 0.375em 0.5em;
  margin: 0 0 0 0.5em;
  width: 8em;
  color: #fff;
  font-size: 0.75em;
  border: 0;
  height: 22px;
`;

export const HeaderButton = styled(SubmitButton)`
  padding: 0.25em 0.5em;
  margin: 0 0 0 0.5em;
  border-radius: 0.125em;
  font-size: 0.75em;
  height: 22px;
  background-color: ${props => props.theme.colors.accent5};
`;

export const IconCloseButton = styled(HeaderButton)`
  float: right;
  margin-left: auto;
  margin-right: 0.5em;
`;
