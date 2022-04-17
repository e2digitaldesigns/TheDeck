/* istanbul ignore file */
import OBSWebSocket from "obs-websocket-js";
import { IntObsScene, IntObsSource } from "../../types";
import _map from "lodash/map";
import { useGlobalData } from "../";

export interface IntUseObsHook {
  getScenes: () => IntObsScene[] | undefined;
  getSources: () => IntObsSource[] | undefined;
}

const useObsHook = () => {
  const { state } = useGlobalData();
  const obs = new OBSWebSocket();

  const password = state?.settings?.features?.obs?.password || "";
  const address = `${state?.settings?.features?.obs?.ipAddress}:${state?.settings?.features?.obs?.port}`;

  const connection = async () => {
    await obs
      .connect({ address, password })
      .then(() => console.log("connected..."))
      .catch(err => {
        console.log(err);
      });
  };

  const getScenes = async () => {
    try {
      await connection();
      const data = await obs.send("GetSceneList");
      return parseScenes(data.scenes);
    } catch (error) {
      return undefined;
    }
  };

  const getSources = async () => {
    try {
      await connection();
      const data = await obs.send("GetSceneList");
      return collectItems(data.scenes);
    } catch (error) {
      return undefined;
    }
  };

  return {
    getScenes,
    getSources
  };
};

export default useObsHook;

function collectItems(scenes: any) {
  const allItems: any = [];

  for (let i = 0; i < scenes.length; i++) {
    const sceneName = scenes[i].name;
    const theSources = scenes[i].sources;

    for (let x = 0; x < theSources.length; x++) {
      allItems.push({ sceneName, item: theSources[x].name });

      if (theSources[x].type === "group") {
        for (let y = 0; y < theSources[x].groupChildren.length; y++) {
          allItems.push({
            sceneName,
            item: theSources[x].groupChildren[y].name
          });
        }
      }
    }
  }

  return allItems;
}

function parseScenes(scenes: any) {
  const allScenes: any[] = [];
  _map(scenes, (scene: any) => {
    allScenes.push({ name: scene.name });
  });
  return allScenes;
}
