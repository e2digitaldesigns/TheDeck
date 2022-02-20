import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import { IntActions } from "../../../../../../../types/globalContextType";
import { objectProps } from "../../../../../../../types";
import { useObs } from "../../../../../../../hooks";
import { SelectField } from "../../../../../../../theme";

export interface ObsActionParserProps {
  state: IntActions;
  onChange: any;
}

interface IntObsStateProps {
  scenes: any;
  sources: objectProps[];
}

const subActionMap: objectProps = {
  obsLayer: "layer",
  obsScene: "scene"
};

const ObsActionParser: React.FC<ObsActionParserProps> = ({
  state,
  onChange
}) => {
  const [obsState, setObsState] = useState<IntObsStateProps>({
    scenes: [],
    sources: []
  });
  const { getScenes, getSources } = useObs();

  const subActionSubStr = state?.subAction && state.subAction.substring(0, 8);
  const subAction = subActionSubStr && subActionMap?.[subActionSubStr];

  useEffect(() => {
    const fetchObs = async () => {
      const scenes = await getScenes();
      const sources = await getSources();
      console.log({ scenes, sources });
      setObsState(obsState => ({ ...obsState, scenes, sources }));
    };

    fetchObs();
    // eslint-disable-next-line
  }, []);

  const dataObj = subAction === "scene" ? obsState?.scenes : obsState?.sources;

  if (subAction) {
    return (
      <SelectField
        name={subAction}
        value={state?.[subAction as keyof IntActions]}
        onChange={e => onChange(e)}
      >
        {!state?.[subAction as keyof IntActions] && (
          <option value="">Choose {subAction}</option>
        )}
        <option>{subAction}s</option>

        {_map(dataObj, (m: any, i) => (
          <option key={m.name || i} value={m.name || m.item}>
            {m.name || m.sceneName + "  " + m.item}
          </option>
        ))}
      </SelectField>
    );
  }

  return <div />;
};

export default ObsActionParser;
