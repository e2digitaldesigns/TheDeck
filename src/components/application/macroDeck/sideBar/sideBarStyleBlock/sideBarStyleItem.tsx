import React, { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  DragAndDropDataTypes,
  DragAndDropOptions,
  IntStyles
} from "../../../../../types";
import * as Styled from "./../sideBarItemStyles.styles";
import Iconic from "../../../../../utils/icons/icons";
import { useStyles } from "../../../../../hooks";

export interface iSideBarItemStyle {
  style: IntStyles;
}

const SideBarItemStyle: React.FC<iSideBarItemStyle> = ({ style }) => {
  const { deleteStyle } = useStyles();
  const fontSize = 12;
  const linkColor = "#aaaaaa";
  const styleItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDragStart = (ev: any) => {
      ev.dataTransfer.setData(
        DragAndDropDataTypes.Action,
        DragAndDropOptions.StyleButtonPad
      );
      ev.dataTransfer.setData(DragAndDropDataTypes.StyleId, style._id);
    };

    styleItemRef?.current?.addEventListener("dragstart", handleDragStart);
  }, [styleItemRef, style._id]);

  const handleStyleDelete = () => {
    deleteStyle(style._id);
  };

  return (
    <Styled.ItemGrid draggable={true} ref={styleItemRef}>
      <Styled.Drag>
        <Iconic color={linkColor} icon="Grid" size={fontSize} />
      </Styled.Drag>

      <Iconic color={style.iconColor} icon={style.icon} size={fontSize} />
      <Iconic color={style.textColor} icon="PenTool" size={fontSize} />
      <Iconic color={style.bgColor} icon="Circle" size={fontSize} />

      <Styled.Remove onClick={handleStyleDelete}>
        <Iconic color={linkColor} icon="Trash" size={fontSize} />
      </Styled.Remove>
    </Styled.ItemGrid>
  );
};

export default SideBarItemStyle;
