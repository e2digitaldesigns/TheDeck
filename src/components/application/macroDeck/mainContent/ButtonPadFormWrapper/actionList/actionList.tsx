import React from "react";
import _map from "lodash/map";
import { Delete } from "@material-ui/icons";
import { useActions, useAppData } from "../../../../../../hooks";
import { IntActions } from "../../../../../../types/globalContextType";
import SubActionParser from "./subActionParser/subActionParser";
import * as Styled from "./actionList.styles";

const ActionList: React.FC<{}> = () => {
  const { appState } = useAppData();
  const actionId = appState.active?.actionId;
  const { activateAction, createAction, getActions, deleteAction } =
    useActions();
  const actions: IntActions[] = getActions();

  const handleSelectActionSet = (_id: string): void => {
    activateAction(_id);
  };

  const handleCreateAction = (): void => {
    createAction();
  };

  const handleDeleteAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    _id: string
  ): void => {
    e.stopPropagation();
    deleteAction(_id);
  };

  return (
    <>
      <Styled.ActionListWrapper>
        <Styled.ActionListWrapperScroll>
          <ul>
            {actions &&
              _map(
                actions,
                (m: IntActions): React.ReactElement => (
                  <Styled.ActionListItem
                    data-testid="action-list__action-item-activate"
                    isActive={m._id === actionId}
                    key={m._id}
                    onClick={() => handleSelectActionSet(m._id)}
                  >
                    <Styled.ActionListItemInfo>
                      <div>{m.action}</div>
                      <div> | </div>
                      <SubActionParser action={m} />
                    </Styled.ActionListItemInfo>

                    <Styled.ActionListItemButton
                      data-testid="action-list__action-item-delete"
                      onClick={e => handleDeleteAction(e, m._id)}
                    >
                      <Delete fontSize="inherit" />
                    </Styled.ActionListItemButton>
                  </Styled.ActionListItem>
                )
              )}
          </ul>
        </Styled.ActionListWrapperScroll>
      </Styled.ActionListWrapper>

      <Styled.ActionListButton
        data-testid="action-list__action-item-new"
        disabled={!appState?.active?.buttonPadId}
        onClick={handleCreateAction}
      >
        New Action
      </Styled.ActionListButton>
    </>
  );
};

export default ActionList;
