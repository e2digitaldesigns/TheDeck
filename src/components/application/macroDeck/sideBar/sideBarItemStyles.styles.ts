import styled from "styled-components";

type ItemGridType = {
  color?: string;
};

export const ItemGrid = styled.div<ItemGridType>`
  width: 13.75rem;
  display: grid;
  grid-template-columns: 2.5em 01.5em 01.5em 01.5em auto;
  grid-gap: 1em;
  font-size: 0.9em;
  padding: 0.625em 1em;
  border-bottom: 0.0625em solid #000;
  text-transform: uppercase;
  background-color: ${props =>
    props?.color ? props.color : "rgba(34, 34, 34, 0.5)"};
`;

export const Drag = styled.a`
  border-right: 0.0625em solid #333;
  margin-right: 0.5em;
`;

export const Remove = styled.a`
  border-left: 0.0625em solid #222;
  margin-left: 0.5em;
  text-align: right;
`;
