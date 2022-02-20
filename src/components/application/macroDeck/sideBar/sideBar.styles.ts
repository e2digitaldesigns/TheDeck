import styled from "styled-components";
import { ScrollBars } from "../../../../theme";

interface IntSideBarListWrapper {
  height?: string;
}
export const SideBarListWrapper = styled.div<IntSideBarListWrapper>`
  width: 100%;
  padding: 0.5em 0.25em 0.5em 0.25em;
  height: ${props => (props?.height ? props.height : "18.3125em")};
  background-color: rgba(23, 23, 23, 0.5);
  margin-top: -0.5em;
  margin-bottom: 1.25em;
`;

export const SideBarListScroll = styled(ScrollBars)`
  height: 100%;

  ::-webkit-scrollbar-track {
    background: #1f1f1f;
    border-top: none;
  }
`;

// 18.1875em
