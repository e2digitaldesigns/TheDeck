import styled from "styled-components";

export const HeaderGrid = styled.div`
  width: 100%;
  height: 7.5em;
  display: grid;
  grid-template-rows: 2em 3em;
  font-size: 0.75em;
  overflow: hidden;
  border-bottom: 0.0625em solid #111;
  background-color: #2b2d30;
  background-color: #2b2d30;
  margin-bottom: 1em;
`;

export const Header = styled.div`
  height: 2em;
  display: grid;
  grid-template-columns: 1.5em auto 1.5em;
  align-items: center;
  border-bottom: 0.0625em solid #111;
  background-color: #414347;
  box-shadow: 0 0.625em 1.125em #111;
`;

export const Icon = styled.div`
  text-align: center;
  color: #aaa;
  padding-top: 0.125em;
  font-size: 1em;
`;

export const SuffixIcon = styled(Icon)`
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

interface IntDropZone {
  active: boolean;
}

export const DropZone = styled.div<IntDropZone>`
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 4.5em;
  padding: 0.5em;
  margin: 0.5em;
  border: 0.125em dashed white;
  /* border: 0.125em dashed ${props => props.theme.colors.accent1}; */
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.5s;
`;
