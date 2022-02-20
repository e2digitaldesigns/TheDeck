import styled from "styled-components";

export const ScrollBars = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0.625em;
  }

  ::-webkit-scrollbar-track {
    background: #1f1f1f;
    border-top: 0.0625em solid ${props => props.theme.colors.accent1};
  }

  ::-webkit-scrollbar-thumb {
    background: #373737;
    min-height: 2rem;
    border-bottom: 0.0625em solid ${props => props.theme.colors.accent1};
    &:hover {
      background: #404040;
    }
  }
`;
