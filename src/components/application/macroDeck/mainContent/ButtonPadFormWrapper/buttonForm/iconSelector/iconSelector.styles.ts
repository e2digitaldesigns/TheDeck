import styled from "styled-components";
import {
  SubmitButton,
  TextField,
  ScrollBars
} from "../../../../../../../theme";

export const IconListWrapper = styled.div`
  position: relative;
  height: 11em;
  background-color: rgba(23, 23, 23, 0.5);
`;

export const IconListSearchWrapper = styled.div`
  width: calc(100% - 1em);
`;

export const IconListSearchField = styled(TextField)`
  height: 2em;
`;

export const IconListWrapperScroll = styled(ScrollBars)`
  margin-top: 8px;
  height: calc(100% - 3em);
  width: calc(100% - 1em);
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.125em 0.25em 0.125em 0.125em;
  grid-gap: 0.25em;
`;

export const IconItem = styled.div`
  width: 100%;
  text-align: center;
  background: #333;

  display: grid;
  justify-items: center;
  align-items: center;

  padding: 0.5em 0;
`;

export const CloseButton = styled(SubmitButton)`
  font-size: 0.625em;
  width: calc(100% - 1.7em);
  float: left;
  border-radius: 0;
  padding: 0.25em;
`;
