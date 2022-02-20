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

export const ProfileHeader = styled.div`
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
