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
import {
  FormFieldFile,
  FormFieldKey,
  FormFieldNumbers,
  FormFieldSelect,
  FormFieldTextArea,
  FormFieldText
} from "./formFields";

import SETTINGS from "../../../../../../settings/system.json";
import MdActionParser from "./parsers/mdActionParser";
import ObsActionParser from "./parsers/obsActionParser";
import secondaryParser from "./secondaryParser";
import * as Styled from "./actionForm.styles";
import { SelectField } from "../../../../../../theme";

interface actionMapProps {
  [key: string]: any;
}

console.log(30, FormFieldFileTypes);

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
      if (action) setState({ ...action });
    }
    // eslint-disable-next-line
  }, [actionId]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name: targetName, value: targetValue } = e.target;
    const newState =
      targetName === "action"
        ? clearButtonAttributes(targetValue)
        : _cloneDeep(state);
    state && setState({ ...newState, [targetName]: targetValue });
  };

  const handleKeyFieldChange = (text: string) => {
    const newState = clearButtonAttributes();
    state && setState({ ...newState, text });
  };

  const handleFilePathChange = (type: FormFieldFileTypes) => {
    const newState = clearButtonAttributes();
    const file: any = document.getElementById(type);
    const path = file?.files?.[0]?.path;
    console.log(75, { path });
    state && setState({ ...newState, path: path });
  };

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

  const actionParser = (action: string) => {
    const actionMap: actionMapProps = {
      api: (
        <FormFieldText name="url" onChange={handleFormChange} state={state} />
      ),

      delay: (
        <FormFieldNumbers
          name="seconds"
          onChange={handleFormChange}
          seconds={true}
          state={state}
        />
      ),
      exe: (
        <FormFieldFile
          id={FormFieldFileTypes.MDFileFieldExe}
          onChange={handleFilePathChange}
        />
      ),
      sound: (
        <FormFieldFile
          id={FormFieldFileTypes.MDFileFieldSound}
          onChange={handleFilePathChange}
        />
      ),
      keyTap: (
        <FormFieldKey
          name="text"
          onChange={handleKeyFieldChange}
          state={state}
        />
      ),

      md: (
        <FormFieldSelect
          name="md"
          onChange={handleFormChange}
          subAction={state.subAction}
        />
      ),
      obs: (
        <FormFieldSelect
          name="obs"
          onChange={handleFormChange}
          subAction={state.subAction}
        />
      ),
      spotify: (
        <FormFieldSelect
          name="spotify"
          onChange={handleFormChange}
          subAction={state.subAction}
        />
      ),
      twitter: (
        <FormFieldTextArea
          name="twitter"
          onChange={handleFormChange}
          state={state}
        />
      )
    };

    return actionMap[action];
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

        {state?.action && actionParser(state.action)}

        {showMdSubs && (
          <div>
            <MdActionParser state={state} onChange={handleFormChange} />
          </div>
        )}

        {showObsSubs && (
          <div>
            <label htmlFor="text"></label>
            <ObsActionParser state={state} onChange={handleFormChange} />
          </div>
        )}
      </Styled.ActionFieldSet>

      <Styled.ActionSubmitButton
        className="action-list-button"
        onClick={submit}
        disabled={disabled}
      >
        Submit
      </Styled.ActionSubmitButton>
    </>
  );
};

export default ActionForms;
