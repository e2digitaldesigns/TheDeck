import React from "react";
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import { useAppData, usePage } from "../../../../../hooks";
import { IntPages } from "../../../../../types";
import * as Styled from "./pageSelect.styles";

export interface IntPageSelect {}

const PageSelect: React.FC<IntPageSelect> = () => {
  const { appState, setAppState } = useAppData();
  const { activatePage, createPage, deletePage, readPages } = usePage();

  const pages = readPages();
  const pageId = appState?.active?.pageId;

  const handleChangePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    activatePage(e.target.value);
  };

  const handleClose = () => {
    const state = _cloneDeep(appState);
    state.iconSelector.isVisible = false;
    setAppState({ ...state });
  };

  return (
    <div>
      {pageId && (
        <Styled.HeaderButton
          data-testid="page_select__remove"
          onClick={() => deletePage()}
        >
          Remove Page
        </Styled.HeaderButton>
      )}

      <Styled.HeaderButton onClick={createPage}>New Page</Styled.HeaderButton>

      <Styled.HeaderSelect
        data-testid="page_select__select"
        onChange={e => handleChangePage(e)}
        value={pageId}
      >
        {_map(
          pages,
          (m: IntPages, i): React.ReactElement => (
            <option key={m._id} value={m._id}>
              Page: {i + 1}
            </option>
          )
        )}
      </Styled.HeaderSelect>

      {appState?.iconSelector?.isVisible && (
        <Styled.HeaderButton
          data-testid="page_select__close_icon"
          onClick={handleClose}
        >
          Close Icon Selector
        </Styled.HeaderButton>
      )}
    </div>
  );
};

export default PageSelect;
