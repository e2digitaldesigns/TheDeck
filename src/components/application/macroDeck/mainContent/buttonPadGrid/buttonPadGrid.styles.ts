import styled from "styled-components";

export const ButtonPadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.25em;
  padding: 0.25em;
  > div {
    height: 100%;
    width: 100%;
    background-color: rgba(109, 109, 109, 0.3);
  }
`;
