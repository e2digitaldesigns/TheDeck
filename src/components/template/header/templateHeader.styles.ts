import styled from "styled-components";

export const Header = styled.header`
  height: ${props => props.theme.sizes.header.height};
  background: #1e1f22;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  -webkit-app-region: drag;
`;

export const UL = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;

  li {
    height: 100%;
    color: #6d6e71;
    display: inline-block;
    -webkit-app-region: no-drag;
    a {
      color: #6d6e71;
      height: 100%;
      display: inline-block;
      padding: 0.375em 1em 0;
    }
    &:hover {
      color: #fff;
      background: #383942;
      a {
        color: #fff;
      }
    }
  }
`;

export const ULRight = styled(UL)`
  text-align: right;

  li {
    padding: 0.25em 0.75em 0;
    &:last-child:hover {
      background: #d41224;
    }
    svg {
      font-size: 1.5em;
    }
  }
`;
