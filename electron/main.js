const electron = require("electron");
const path = require("path");
const getApplicationUrl = require("./utils/getApplicationUrl");
const menuTemplate = require("./menu");
const listners = require("./listeners");
const server = require("./server/server");
const storage = require("electron-json-storage");

const SETTINGS = require("./settings/system.json");

console.log(20, storage.getDataPath());
var isDev = process.env.APP_DEV ? true : false;
console.log(13, isDev, SETTINGS.LOAD_URL.LOCAL);

const { app: electronApp, BrowserWindow, ipcMain, Menu, Tray } = electron;

let mainWindow;
let tray = null;
const width = SETTINGS.APPLICATION.SIZE.WIDTH;
const height = SETTINGS.APPLICATION.SIZE.HEIGHT;

electronApp.on("ready", () => {
  tray = new Tray(__dirname + "/" + SETTINGS.LOGOS.SMALL);
  tray.setToolTip(SETTINGS.TRAY.TOOLTIP);

  mainWindow = new BrowserWindow({
    width: width,
    minWidth: width,
    height: height,
    minHeight: height,
    resizable: true,
    frame: false,
    backgroundColor: SETTINGS.APPLICATION.COLORS.BG,
    movable: true,
    minimizable: true,
    maximizable: true,
    icon: __dirname + "/" + SETTINGS.LOGOS.SMALL,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: __dirname + "/" + SETTINGS.SCRIPTS.PRELOAD,
      webSecurity: false
    }
  });

  mainWindow.setAspectRatio(width / height);

  // mainWindow.loadURL(
  //   isDev ? SETTINGS.LOAD_URL.LOCAL : `${__dirname}/${SETTINGS.LOAD_URL.BUILD}`
  // );
  // mainWindow.loadURL(SETTINGS.LOAD_URL.LOCAL);
  // mainWindow.loadURL(`${__dirname}/${SETTINGS.LOAD_URL.BUILD}`);

  mainWindow.loadURL("https://www.yahoo.com");

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("minimize", event => {
    event.preventDefault();

    const template = [
      {
        label: SETTINGS.TRAY.TOOLTIP,
        icon: __dirname + "/" + SETTINGS.LOGOS.SMALL,
        enabled: false
      },
      {
        type: "separator"
      },
      {
        label: "Show App",
        click: () => {
          mainWindow.show();
        }
      },
      {
        label: "Quit",
        click: () => {
          electronApp.quit();
          mainWindow = null;
        }
      }
    ];

    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    mainWindow.hide();
  });

  mainWindow.on("closed", () => {
    electronApp.quit();
    mainWindow = null;
  });

  listners.listeners(mainWindow);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  server(mainWindow);
});
