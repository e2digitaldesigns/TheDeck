import styled from "styled-components";

type ItemGridType = {
  active?: boolean;
};

export const ItemGrid = styled.div<ItemGridType>`
  width: 13.75rem;
  display: grid;
  grid-template-columns: auto 0.55em 0.55em;
  grid-gap: 1em;
  font-size: 0.9em;
  padding: 0.625em 1em;
  border-bottom: 0.0625em solid #000;
  text-transform: uppercase;
  background: ${props =>
    props?.active ? props.theme.colors.accent3 : "rgba(34, 34, 34, 0.5)"};
  font-weight: ${props => (props?.active ? "bold" : "inherit")};
  &:hover {
    background-color: ${props =>
      props?.active ? "inherit" : props.theme.colors.accent4};
  }
  > div:nth-child(n + 2) {
    transition: 0.5s;
    opacity: 0;
    cursor: pointer;
    &:hover {
      color: ${props =>
        props?.active ? "inherit" : props.theme.colors.accent1};
    }
  }
  &:hover {
    div {
      opacity: 1;
    }
  }
`;
