import * as React from "react";
import { Close, Fullscreen, FullscreenExit, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";

import * as Styled from "./templateHeader.styles";
import { useElectron } from "../../../hooks";
import * as TYPES from "./../../../types";

export interface ITemplateHeader {}

const TemplateHeader: React.FC<ITemplateHeader> = () => {
  const [fullScreenState, setFullScreenState] = React.useState<boolean>(false);
  const { ipcRender } = useElectron();

  const handleCloseApplication = (): void => {
    ipcRender(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.close
    );
  };

  const handleFullScreenToggle = (action: boolean): void => {
    ipcRender(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.fsToggle
    );
    setFullScreenState(action);
  };

  const handleMinimizeApplication = (): void => {
    ipcRender(
      TYPES.IpcRendererTypes.header,
      TYPES.IpcRendererTypesAction.minimize
    );
  };

  return (
    <>
      <Styled.Header data-testid="template_header__component">
        <Styled.UL data-testid="template_header__menu">
          <li>
            <Link to={TYPES.SectionRoutes.Home}>Home</Link>
          </li>

          <li>
            <Link to={TYPES.SectionRoutes.MacroDeck}>MacroDeck</Link>
          </li>

          <li>
            <Link to={TYPES.SectionRoutes.Settings}>Settings</Link>
          </li>
        </Styled.UL>

        <Styled.ULRight data-testid="template_header__options">
          <li
            data-testid="template_header__minimize-button"
            onClick={handleMinimizeApplication}
          >
            <Remove />
          </li>

          {fullScreenState ? (
            <li
              data-testid="template_header__fs-exit-button"
              onClick={() => handleFullScreenToggle(false)}
            >
              <FullscreenExit />
            </li>
          ) : (
            <li
              data-testid="template_header__fs-button"
              onClick={() => handleFullScreenToggle(true)}
            >
              <Fullscreen fontSize="inherit" />
            </li>
          )}
          <li
            data-testid="template_header__close-button"
            onClick={handleCloseApplication}
          >
            <Close />
          </li>
        </Styled.ULRight>
      </Styled.Header>
    </>
  );
};

export default TemplateHeader;
