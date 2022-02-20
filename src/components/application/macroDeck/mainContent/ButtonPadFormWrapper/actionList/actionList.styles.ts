import styled from "styled-components";
import { ScrollBars, SubmitButton } from "../../../../../../theme";

export const ActionListWrapper = styled.div`
  width: 100%;
  padding: 0.5em 0.25em 0.5em 0.25em;
  height: 12em;
  background-color: rgba(23, 23, 23, 0.5);
  margin-top: -0.5em;
`;

export const ActionListWrapperScroll = styled(ScrollBars)`
  height: 100%;
`;

type ActionListItemType = {
  isActive?: boolean;
};

export const ActionListItem = styled.li<ActionListItemType>`
  display: grid;
  width: calc(100% - 0.25em);
  height: 1.875em;
  grid-template-columns: auto 1.5em;
  padding: 0.25em 0.75em 0.25em 0.5em;
  border-bottom: 0.0625em solid #212121;
  align-items: center;
  transition: background-color 0.5s;
  background-image: ${props =>
    props?.isActive
      ? `linear-gradient(to right, ${props.theme.colors.accent1}, #171717)`
      : "inherit"};

  ${props =>
    !props.isActive &&
    `&:hover {
        background-color: #282828;
        background-image: linear-gradient(to right, #282828, #171717);
        }`};

  &:last-child {
    border-bottom: 0;
  }
`;

export const ActionListItemInfo = styled.div`
  font-size: 0.75em;
  width: 100%;
  height: 0.875em;
  display: grid;
  grid-template-columns: 3.5em 1em auto;

  div:nth-child(1) {
    font-weight: 400;
    text-transform: uppercase;
  }

  div:nth-child(2) {
    text-align: center;
  }

  div:nth-child(3) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 1em 0 0.5em;
  }
`;

export const ActionListItemButton = styled(SubmitButton)`
  height: 1.375em;
  margin: 0;
  padding: 0;
  border-radius: 0.125em;
  font-size: 1em;
  align-items: center;
`;

export const ActionListButton = styled(SubmitButton)`
  margin: 0.5rem 0 0 0;
  font-size: 0.75em;
  min-height: 1.5em;
  min-width: 5em;
`;
