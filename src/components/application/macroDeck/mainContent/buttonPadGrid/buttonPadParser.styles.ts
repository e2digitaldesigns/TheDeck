import styled from "styled-components";
import chroma from "chroma-js";

const colorParser = (bgColor: string | undefined) => {
  return !bgColor ? undefined : chroma(bgColor).luminance(0.5);
};

type ButtonPadInnerType = {
  active?: boolean;
  bgColor?: string | undefined;
  dropZone?: boolean;
  isSet?: boolean;
};

export const ButtonPadInner = styled.div<ButtonPadInnerType>`
  transition: border-bottom-color 0.5s;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.25em;
  border-bottom: 0.125em solid
    ${props =>
      props?.active
        ? colorParser(props.bgColor) || props.theme.colors.accent1
        : "transparent"};

  background-color: ${props => props.bgColor};

  div:nth-child(n + 1):nth-child(-n + 4) {
    opacity: ${props => (props?.isSet ? 0 : 1)};
  }

  :hover {
    div:nth-child(n + 1):nth-child(-n + 4) {
      opacity: 1;
    }
  }
`;

const ButtonPadOptionIcon = styled.div`
  position: absolute;
  top: 0.125em;
  height: 1.5em;
  width: 1.5em;
  /* text-align: center; */
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);

  transition: background-color 0.75s;
  /* background-color: rgba(255, 255, 255, 0.05); */
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.55);
  }
`;

export const ButtonPadOptionDelete = styled(ButtonPadOptionIcon)`
  right: 0;
  border-radius: 50% 0 0 50%;
`;

export const ButtonPadOptionEdit = styled(ButtonPadOptionIcon)`
  left: 0;
  border-radius: 0 50% 50% 0;
`;

export const ButtonPadOptionCopy = styled(ButtonPadOptionIcon)`
  left: 37px;
  border-radius: 50% 0 0 50%;
`;

export const ButtonPadOptionPaste = styled(ButtonPadOptionIcon)`
  right: 38px;
  border-radius: 0 50% 50% 0;
`;

type ButtonPadTextType = {
  color?: string | undefined;
};

export const ButtonPadText = styled.div<ButtonPadTextType>`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${props => props.color || "#ffffff"};
  width: 100%;
  min-height: 1.25em;
  padding: 0.25em 0.5em;
  text-align: center;
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonPadIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  font-size: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonPadEmpty = styled(ButtonPadIcon)`
  * {
    cursor: pointer;
  }
`;
