import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import { useGlobalData } from "..";

import {
  IntStyles,
  IntButtonPads,
  IntGlobalData,
  IntGlobalContextInterface
} from "../../types";
import { idGenerator } from "../../utils";

export interface IntUseStyleHook {
  createStyle: (buttonPadNum: string, pageId: string) => void;
  readStyles: () => IntStyles[];
  deleteStyle: (_id: string) => void;
}

const useStylesHook = (): IntUseStyleHook => {
  const globalData: IntGlobalData = useGlobalData();

  const createStyle: IntUseStyleHook["createStyle"] = (
    buttonPadNum: string,
    pageId: string
  ): void => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);

    const buttonPad = _find(
      state.buttonPads,
      (f: IntButtonPads) =>
        f.pageId === pageId && f.buttonPadNum === parseInt(buttonPadNum)
    );

    if (!buttonPad) return;

    const style = {
      textColor: buttonPad.textColor,
      icon: buttonPad.icon,
      iconColor: buttonPad.iconColor,
      image: buttonPad.image,
      bgColor: buttonPad.bgColor
    };

    state.styles.push({ ...style, _id: idGenerator() });
    globalData.setState(state);
  };

  const readStyles: IntUseStyleHook["readStyles"] = (): IntStyles[] => {
    const state = _cloneDeep(globalData.state);
    return state.styles;
  };

  const deleteStyle: IntUseStyleHook["deleteStyle"] = (_id: string): void => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);
    state.styles = _filter(state.styles, (f: IntStyles) => f._id !== _id);
    globalData.setState(state);
  };

  return {
    createStyle,
    readStyles,
    deleteStyle
  };
};

export default useStylesHook;
