import React, { useEffect, useState } from "react";

import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _map from "lodash/map";

import { useAppData } from "../../../../../../../hooks";

import * as Styled from "./iconSelector.styles";
import ICONS from "../../../../../../../utils/icons/featherIconDb.json";
import Iconic from "../../../../../../../utils/icons/icons";

interface IntIconSelectorProps {
  handleSelectIcon: (icon: string) => void;
  isVisible: boolean;
}
const IconSelector: React.FC<IntIconSelectorProps> = ({
  handleSelectIcon,
  isVisible
}) => {
  const { appState, setAppState } = useAppData();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setFilter("");
    handleCloseIconSelector();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.active.buttonPadId]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCloseIconSelector = (icon: string | null = null) => {
    const state = _cloneDeep(appState);
    state.iconSelector.isVisible = false;
    setAppState({ ...state });

    icon !== null && handleSelectIcon(icon);
  };

  const filterIcons = (iconSet: any) => {
    const filtered = filter
      ? _filter(iconSet, (m: any) =>
          m.display.toLowerCase().includes(filter.toLowerCase())
        )
      : iconSet;

    return filtered;
  };

  if (!isVisible) return null;

  return (
    <Styled.IconListWrapper>
      <Styled.IconListSearchWrapper>
        <Styled.IconListSearchField
          autoFocus={true}
          data-testid="icon-selector__search-field"
          onChange={e => handleOnchange(e)}
          value={filter}
        />
      </Styled.IconListSearchWrapper>

      <Styled.IconListWrapperScroll>
        <Styled.IconGrid>
          <Styled.IconItem
            data-testid="icon-selector__none"
            onClick={() => handleCloseIconSelector("")}
          >
            None
          </Styled.IconItem>

          {_map(filterIcons(ICONS), (m: any) => (
            <Styled.IconItem
              data-testid="icon-selector__icons"
              key={m._id}
              onClick={() => handleCloseIconSelector(m.name)}
            >
              <Iconic icon={m.name} />
            </Styled.IconItem>
          ))}
        </Styled.IconGrid>
      </Styled.IconListWrapperScroll>
      <Styled.CloseButton
        data-testid="icon-selector__close"
        onClick={() => handleCloseIconSelector()}
      >
        Close
      </Styled.CloseButton>
    </Styled.IconListWrapper>
  );
};

export default IconSelector;
