import React, { useEffect, useState } from "react";
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import {
  ApplicationActions,
  FormFieldFileTypes,
  IntActions,
  IntActionTypes
} from "../../../../../../types";
import { useActions, useAppData } from "../../../../../../hooks";

import SETTINGS from "../../../../../../settings/system.json";
import MdActionParser from "./parsers/mdActionParser";
import ObsActionParser from "./parsers/obsActionParser";
import secondaryParser from "./secondaryParser";
import * as Styled from "./actionForm.styles";
import { SelectField } from "../../../../../../theme";

import ActionParser from "./actionParser";

interface IntResetObj {
  seconds: number;
  url: string;
  text: string;
  scene: string;
  layer: string;
  path: string;
  page: string;
  profile: string;
  subAction?: string;
}

const ActionForms: React.FC<{}> = () => {
  const { appState } = useAppData();
  const { getAction, updateAction } = useActions();

  const [state, setState] = useState<IntActions>(
    SETTINGS.DEFAULT_STATE.ACTIONS
  );

  const actionId = appState.active?.actionId;

  useEffect((): void => {
    if (!actionId) {
      setState(state => ({ ...SETTINGS.DEFAULT_STATE.ACTIONS }));
    } else {
      const action = getAction(actionId);
      console.log(48, action);
      if (action) setState({ ...action });
    }
    // eslint-disable-next-line
  }, [actionId]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name: targetName, value: targetValue } = e.target;
    const newState =
      targetName === "action"
        ? clearButtonAttributes(targetValue)
        : _cloneDeep(state);
    state && setState({ ...newState, [targetName]: targetValue });
  };

  const handleKeyFieldChange = (text: string): void => {
    const newState = clearButtonAttributes();
    setState({ ...newState, text });
  };

  const handleFilePathChange = (id: FormFieldFileTypes): void => {
    const newState = clearButtonAttributes();
    const fileInput: any = document.getElementById(id) as HTMLInputElement;
    const path = fileInput?.files?.[0].path as string;
    path && state && setState({ ...newState, path: path });
  };

  const clearButtonAttributes = (action: string | null = null) => {
    const resetObj: IntResetObj = {
      seconds: 0,
      url: "",
      text: "",
      scene: "",
      layer: "",
      path: "",
      page: "",
      profile: ""
    };

    if (action !== ApplicationActions.MD) resetObj.subAction = "";
    const newState = _cloneDeep(state);
    return { ...newState, ...resetObj };
  };

  const submit = () => {
    const newState = _cloneDeep(state);
    if (
      newState.action !== ApplicationActions.MD &&
      newState.action !== ApplicationActions.OBS
    ) {
      newState.subAction = "";
    }
    updateAction(newState);
  };

  const showMdSubs =
    state?.action === ApplicationActions.MD &&
    secondaryParser(ApplicationActions.MD, state);
  const showObsSubs =
    state?.action === ApplicationActions.OBS &&
    secondaryParser(ApplicationActions.OBS, state);

  const disabled = !actionId;

  return (
    <>
      <Styled.ActionFieldSet>
        <div>
          <label htmlFor="action">Action:</label>
          <SelectField
            data-testid="action-form__action"
            name="action"
            value={state?.action}
            onChange={e => handleFormChange(e)}
            disabled={disabled}
          >
            {!state?.action && <option value="">Choose Action</option>}
            {_map(
              SETTINGS.ACTION_TYPES,
              (m: IntActionTypes) =>
                m.active && (
                  <option key={m.name} value={m.name}>
                    {m.display}
                  </option>
                )
            )}
          </SelectField>
        </div>

        {state?.action && (
          <ActionParser
            handleFilePathChange={handleFilePathChange}
            handleFormChange={handleFormChange}
            handleKeyFieldChange={handleKeyFieldChange}
            state={state}
          />
        )}

        {showMdSubs && (
          <div data-testid="action-form__md-subs">
            <MdActionParser state={state} onChange={handleFormChange} />
          </div>
        )}

        {showObsSubs && (
          <div data-testid="action-form__obs-subs">
            <label htmlFor="text"></label>
            <ObsActionParser state={state} onChange={handleFormChange} />
          </div>
        )}
      </Styled.ActionFieldSet>

      <Styled.ActionSubmitButton
        data-testid="action-form__submit"
        onClick={submit}
        disabled={disabled}
      >
        Submit
      </Styled.ActionSubmitButton>
    </>
  );
};

export default ActionForms;
