import styled from "styled-components";

export const ButtonPadOptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.25em;
  padding: 0.25em;
  /* background-color: blue; */
  /* background-color: #191919; */
  height: 100%;

  > div {
    padding: 0.5em 0.75em;
    margin: 0.5em 0;
    overflow: hidden;
    &:nth-child(2) {
      border: 0.125em dotted #333;
      border-top: 0;
      border-bottom: 0;
    }
  }
`;
