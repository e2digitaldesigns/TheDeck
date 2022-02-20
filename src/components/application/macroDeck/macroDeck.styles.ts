import styled from "styled-components";

const gridGapper = ".5em";

export const MacroGrid = styled.div`
  display: grid;
  height: 100%;

  grid-template-columns: ${gridGapper} ${props =>
      props.theme.sizes.macroDeck.sideBar.width} ${gridGapper} ${props =>
      props.theme.sizes.macroDeck.mainContent.width} ${gridGapper};
`;

export const MacroGridItems = styled.div`
  background-color: rgba(43, 45, 48, 0.3);
  border-bottom: 0.125em solid ${props => props.theme.colors.accent1};
  margin: ${gridGapper} 0;
  height: calc(100vh - 3.5em);
`;

export const SideBar = styled(MacroGridItems)``;

export const MainContent = styled(MacroGridItems)`
  display: grid;
  grid-template-rows: 385px 70px 260px;
`;

//1280
// height: "785px",
