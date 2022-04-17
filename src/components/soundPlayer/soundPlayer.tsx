import React, { useEffect } from "react";
import { window } from "../../hooks/useElectronHook/window";
import { IpcRendererTypes } from "../../types";
import { MDAudio, MDHTMLAudioElement } from "./MDAudio";
const ipcRenderer = window?.electron?.ipcRenderer || null;

export const playMethod = (e: object, data: string) => {
  const audioObj: MDHTMLAudioElement = new MDAudio(data);

  audioObj.addEventListener("canplaythrough", () => {
    audioObj.play();
  });
};

const SoundPlayer: React.FC = () => {
  useEffect(() => {
    ipcRenderer && ipcRenderer.on(IpcRendererTypes.mdPlaySound, playMethod);

    return () => {
      ipcRenderer &&
        ipcRenderer.removeListener(IpcRendererTypes.mdPlaySound, playMethod);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div data-testid="sound_player" />;
};

export default SoundPlayer;
