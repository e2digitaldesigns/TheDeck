import * as React from "react";
import _size from "lodash/size";
import { FileCopy } from "@material-ui/icons";
import { useDropZone, useGlobalData, useStyles } from "../../../../../hooks";
import * as Styled from "./sideBarStyleHeader.styles";
import { DragAndDropDataTypes } from "../../../../../types";

export interface IntMacroDeckSideBarStyleHeader {}

const MacroDeckSideBarStyleHeader: React.FC<
  IntMacroDeckSideBarStyleHeader
> = () => {
  const globalData = useGlobalData();
  const { dropZoneState } = useDropZone();
  const { createStyle } = useStyles();
  const data = globalData?.state?.styles || [];
  const dataSize = _size(data);
  const header = "STYLES";

  const allowDrop = (ev: any) => {
    ev.preventDefault();
  };

  const handleDrop = async (ev: any) => {
    const buttonPadNum = ev.dataTransfer.getData(
      DragAndDropDataTypes.OriginPadNumber
    );
    const pageId = ev.dataTransfer.getData(DragAndDropDataTypes.PageId);
    createStyle(buttonPadNum, pageId);
  };

  return (
    <>
      <Styled.HeaderGrid
        data-testid="sidebar_style_header__component"
        onDragOver={e => allowDrop(e)}
        onDrop={e => handleDrop(e)}
      >
        <Styled.Header>
          <Styled.Icon>
            <FileCopy fontSize="inherit" />
          </Styled.Icon>
          <div>
            {header} (
            <span data-testid="sidebar_style_header__style-count">
              {dataSize}
            </span>
            )
          </div>
          <Styled.SuffixIcon></Styled.SuffixIcon>
        </Styled.Header>

        <Styled.DropZone
          active={dropZoneState.dropZones.styleHeader}
          data-testid="sidebar_style_header__drop-zone"
        >
          Drop Pad Here! <br />
          to save button style...
        </Styled.DropZone>
      </Styled.HeaderGrid>
    </>
  );
};

export default MacroDeckSideBarStyleHeader;
