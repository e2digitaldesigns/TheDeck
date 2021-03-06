const { ipcMain } = require("electron");
const fs = require("fs");
const ip = require("ip");
const _cloneDeep = require("lodash/cloneDeep");
const storage = require("electron-json-storage");
const SETTINGS = require("../../settings/system.json");
const STARTER_JSON = require("../../utils/json/starter.json");

const setIpAddress = json => {
  const data = _cloneDeep(json);
  data.settings.ipAddress = ip.address();
  data.settings.port = data?.md?.settings?.port || SETTINGS.DEFAULT_PORT;
  return data;
};

const database = () => {
  ipcMain.on("database", (event, data) => {
    const actions = {
      loadAppData: () => {
        try {
          storage.get("md", (error, theJson) => {
            const useJson =
              !error && theJson.hasOwnProperty("settings")
                ? theJson
                : STARTER_JSON;
            event.reply("database:return", setIpAddress(useJson));
            if (error) throw error;
          });
        } catch (err) {
          console.error(err);
        }
      },

      saveAppData: () => {
        try {
          storage.set("md", data.data, error => {
            if (error) throw error;
            console.log("file written successfully");
          });
        } catch (err) {
          console.error(err);
        }
      }
    };

    actions[data.action] && setTimeout(() => actions[data.action](), 100);
  });
};

module.exports = database;
