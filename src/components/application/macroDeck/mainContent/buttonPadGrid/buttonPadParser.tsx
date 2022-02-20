import React, { useEffect, useState, useRef } from "react";
import { useAppData, useButton, useDropZone } from "../../../../../hooks";
import {
  DragAndDropDataTypes,
  DragAndDropOptions,
  IntAppData
} from "../../../../../types";
import { AddBox, Delete, Edit, FileCopy, Restore } from "@material-ui/icons";
import Iconic from "../../../../../utils/icons/icons";
import * as Styled from "./buttonPadParser.styles";
import _cloneDeep from "lodash/cloneDeep";

export interface ButtonPadParserProps {
  padNumber: number;
  handleButtonCopy: any;
  copyState: any;
}

const ButtonPadParser: React.FC<ButtonPadParserProps> = ({
  copyState,
  handleButtonCopy,
  padNumber
}) => {
  const [isDragOver, setIsdragOver] = useState<boolean>(false);
  const appData: IntAppData = useAppData();
  const { dropZoneState, setDropZoneState } = useDropZone();
  const {
    activateButtonPad,
    addStyleToButtonPad,
    createButtonPad,
    deleteButtonPad,
    overWriteButtonPad,
    swapButtonPad,
    readButtonPad,
    pasteButtonPad
  } = useButton();
  const buttonPad = readButtonPad(padNumber);
  const activeButtonPadId = appData.appState.active.buttonPadId;
  const buttonPadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDragStart = (e: any) => {
      const dropZoneStateClone = _cloneDeep(dropZoneState);
      // console.log(51, dropZoneStateClone);
      dropZoneStateClone.dropZones.buttonPads = true;
      dropZoneStateClone.dropZones.styleHeader = true;
      setDropZoneState(dropZoneStateClone);

      if (e?.dataTransfer?.setData) {
        const dndAction = e.ctrlKey
          ? DragAndDropOptions.CopyButtonPad
          : DragAndDropOptions.SwapButtonPad;

        e.dataTransfer.setData(DragAndDropDataTypes.Action, dndAction);

        e.dataTransfer.setData(
          DragAndDropDataTypes.PageId,
          appData?.appState?.active?.pageId
        );

        e.dataTransfer.setData(DragAndDropDataTypes.OriginPadNumber, padNumber);
      }
    };

    const handleDragEnd = () => {
      const dropZoneStateClone = _cloneDeep(dropZoneState);
      // console.log(87, dropZoneStateClone);
      dropZoneStateClone.dropZones.buttonPads = false;
      dropZoneStateClone.dropZones.styleHeader = false;
      setDropZoneState(dropZoneStateClone);
    };

    let buttonPadRefCleanUp = buttonPadRef.current;
    buttonPadRefCleanUp?.addEventListener("dragstart", handleDragStart);
    buttonPadRefCleanUp?.addEventListener("dragend", handleDragEnd);

    return () => {
      buttonPadRefCleanUp?.removeEventListener("dragstart", handleDragStart);
      buttonPadRefCleanUp?.removeEventListener("dragend", handleDragEnd);
      buttonPadRefCleanUp = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonPadRef, padNumber]);

  const handleDrop = async (ev: any, destinationPadNumber: number) => {
    setIsdragOver(false);
    const dndAction = ev.dataTransfer.getData(DragAndDropDataTypes.Action);
    console.log(89, { dndAction, destinationPadNumber });
    // return;

    switch (dndAction) {
      case DragAndDropOptions.StyleButtonPad:
        addStyleToButtonPad(
          ev.dataTransfer.getData(DragAndDropDataTypes.StyleId),
          appData?.appState?.active?.pageId,
          padNumber
        );
        break;

      case DragAndDropOptions.CopyButtonPad:
        if (!ev.ctrlKey) return;
        overWriteButtonPad(
          parseInt(
            ev.dataTransfer.getData(DragAndDropDataTypes.OriginPadNumber)
          ),
          destinationPadNumber
        );
        break;

      case DragAndDropOptions.SwapButtonPad:
        swapButtonPad(
          parseInt(
            ev.dataTransfer.getData(DragAndDropDataTypes.OriginPadNumber)
          ),
          destinationPadNumber
        );
        break;

      default:
        break;
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsdragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsdragOver(false);
  };

  const handleButtonCreate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    createButtonPad(padNumber);
  };

  const handleButtonActivate = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    buttonPad && activateButtonPad(buttonPad._id);
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    buttonPad && deleteButtonPad(buttonPad._id);
  };

  const handlePasteToButton = () => {
    pasteButtonPad(buttonPad, copyState);
  };

  if (!padNumber) return <div />;

  return (
    <Styled.ButtonPadInner
      active={buttonPad?._id === activeButtonPadId}
      bgColor={buttonPad?.bgColor}
      dropZone={
        buttonPad?._id !== activeButtonPadId &&
        dropZoneState.dropZones.buttonPads
      }
      data-testid="button_pad_parser__button-inner"
      draggable={buttonPad?._id ? true : false}
      isSet={!!buttonPad}
      onDragLeave={e => handleDragLeave(e)}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e, padNumber)}
      ref={buttonPadRef}
    >
      {buttonPad ? (
        <>
          <Styled.ButtonPadOptionDelete
            data-testid="button_pad_parser__option-delete"
            onClick={e => handleDeleteButton(e)}
          >
            <Delete fontSize="inherit" />
          </Styled.ButtonPadOptionDelete>

          <Styled.ButtonPadOptionEdit
            data-testid="button_pad_parser__option-edit"
            onClick={e => handleButtonActivate(e)}
          >
            <Edit fontSize="inherit" />
          </Styled.ButtonPadOptionEdit>

          <Styled.ButtonPadOptionCopy
            data-testid="button_pad_parser__option-copy"
            onClick={() => handleButtonCopy(buttonPad)}
          >
            <FileCopy fontSize="inherit" />
          </Styled.ButtonPadOptionCopy>

          <Styled.ButtonPadOptionPaste
            data-testid="button_pad_parser__option-paste"
            onClick={handlePasteToButton}
          >
            <Restore fontSize="inherit" />
          </Styled.ButtonPadOptionPaste>

          <Styled.ButtonPadIcon>
            {buttonPad?.icon && (
              <Iconic
                color={buttonPad.iconColor}
                data-testid="button_pad_parser__icon"
                icon={buttonPad.icon}
                size={32}
              />
            )}
          </Styled.ButtonPadIcon>

          <Styled.ButtonPadText color={buttonPad?.textColor}>
            {isDragOver ? "Drop Here" : buttonPad?.text}
          </Styled.ButtonPadText>
        </>
      ) : (
        <Styled.ButtonPadEmpty
          data-testid="button_pad_parser__create"
          onClick={handleButtonCreate}
        >
          <AddBox fontSize="inherit" />

          <Styled.ButtonPadText>
            {isDragOver && "Drop Here"}
          </Styled.ButtonPadText>
        </Styled.ButtonPadEmpty>
      )}
    </Styled.ButtonPadInner>
  );
};

export default ButtonPadParser;
