import React, { useState } from "react";
import _cloneDeep from "lodash/clone";
import _filter from "lodash/filter";
import _map from "lodash/map";
import _range from "lodash/range";
import * as Styled from "./buttonPadGrid.styles";
import { buttonMapper } from "./buttonMapper";
import { useAppData, useGlobalData, useProfile } from "../../../../../hooks";
import ButtonPadParser from "./buttonPadParser";
import {
  ButtonPadGridCopyStateType,
  ButtonPadNums,
  IntActions,
  IntButtonPads,
  IntGlobalData
} from "../../../../../types";

const ButtonPadGrid: React.FC<{}> = () => {
  const [copyState, setCopyState] =
    useState<ButtonPadGridCopyStateType>(undefined);
  const globalData: IntGlobalData = useGlobalData();
  const { appState } = useAppData();
  const buttonPadArray: number[] = _range(1, ButtonPadNums.bpn32 + 1);
  const { readProfile } = useProfile();
  const profile = readProfile();

  const buttonPadParserNumbering = (padNumber: number): number => {
    let padCount = profile.buttonPads;

    const data: number =
      padCount && buttonMapper?.[padCount]?.[padNumber]
        ? Number(buttonMapper[padCount][padNumber])
        : padCount && padCount === ButtonPadNums.bpn32
        ? padNumber
        : 0;

    return data;
  };

  const handleButtonCopy = (buttonPad: IntButtonPads) => {
    const state = _cloneDeep(globalData.state);
    const actions = _filter(
      state.actions,
      (f: IntActions) => f.buttonPadId === buttonPad._id
    );

    setCopyState({
      buttonPad: {
        bgColor: buttonPad.bgColor,
        icon: buttonPad.icon,
        iconColor: buttonPad.iconColor,
        text: buttonPad.text,
        textColor: buttonPad.textColor
      },
      actions
    });
  };

  if (!appState?.active?.profileId) {
    return <div data-testid="button_pad_grid__null" />;
  }

  return (
    <Styled.ButtonPadGrid data-testid="button_pad_grid__button-pad">
      {_map(
        buttonPadArray,
        (m: number): React.ReactElement => (
          <div key={m}>
            <ButtonPadParser
              copyState={copyState}
              handleButtonCopy={handleButtonCopy}
              padNumber={buttonPadParserNumbering(m)}
            />
          </div>
        )
      )}
    </Styled.ButtonPadGrid>
  );
};

export default ButtonPadGrid;
