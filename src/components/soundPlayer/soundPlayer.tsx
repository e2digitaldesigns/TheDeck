import React, { useEffect } from "react";
import { window } from "../../hooks/useElectronHook/window";
import { IpcRendererTypes } from "../../types";
const ipcRenderer = window?.electron?.ipcRenderer || null;

class MDAudio extends Audio {
  stop() {
    this.pause();
    this.currentTime = 0;
  }
}

interface MDHTMLAudioElement extends HTMLAudioElement {
  stop: () => void;
}

const SoundPlayer: React.FC = () => {
  const audioObj: MDHTMLAudioElement = new MDAudio();

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on(
        IpcRendererTypes.mdPlaySound,
        (e: object, data: string) => {
          audioObj.src = data;
          console.log(26, data);

          audioObj.addEventListener("canplaythrough", () => {
            audioObj.play();
          });
        }
      );
    }

    return () => {
      ipcRenderer.removeAllListeners(IpcRendererTypes.mdPlaySound);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default SoundPlayer;
