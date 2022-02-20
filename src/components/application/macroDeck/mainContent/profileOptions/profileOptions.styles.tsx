import styled from "styled-components";

type ButtonPadInnerType = {
  active?: boolean;
};

export const ButtonPadInner = styled.div<ButtonPadInnerType>`
  border-bottom: 0.125em solid
    ${props => (props?.active ? props.theme.colors.accent1 : "transparent")};
`;

export const PageHeaderWrapper = styled.div`
  width: calc(100% - 0.25em);
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0.125em 0.25em 0.125em;
  background-color: #1e1e1e;
  border-bottom: 0.0625em solid ${props => props.theme.colors.border};
  overflow: hidden;
  box-sizing: border-box !important;
`;

export const PageHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 2.25em;
  box-shadow: 0 0.625em 1.125em #111;
  border-bottom: 0.0625em solid ${props => props.theme.colors.border};
  z-index: 500;
  align-items: center;
  background-color: #424242;
  overflow: hidden;
  padding: 0 0.5em;

  > div:nth-child(1) {
    height: 100%;
    display: grid;
    grid-column-gap: 0.25em;
    grid-template-columns: 12em 7em 4em;
    align-items: center;
  }

  > div:nth-child(2) {
  }
`;

export const PageTabs = styled.div`
  position: absolute;
  width: 100%;
  height: 1.5em;
  top: 2.75em;
  display: flex;
`;

export const PageTab = styled.div`
  background-color: ${props => props.theme.colors.accent1};
  padding: 0 1em;
  line-height: 1.5em;
  font-size: 0.875em;
  text-transform: uppercase;
`;
