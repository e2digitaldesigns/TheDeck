const electron = require("electron");
const SETTINGS = require("./settings/system.json");

const isDev = process?.env?.APP_DEV ? true : false;
console.log(13, { isDev });

const { app: electronApp, BrowserWindow, ipcMain, Menu, Tray } = electron;

let mainWindow;
let tray = null;
const width = SETTINGS.APPLICATION.SIZE.WIDTH;
const height = SETTINGS.APPLICATION.SIZE.HEIGHT;

electronApp.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: width,
    minWidth: width,
    height: height,
    minHeight: height,
    resizable: true,
    frame: true,
    backgroundColor: SETTINGS.APPLICATION.COLORS.BG,
    movable: true,
    minimizable: true,
    maximizable: true,
    icon: __dirname + SETTINGS.LOGOS.SMALL,
    show: false,
    webPreferences: {
      contextIsolation: false,
      devTools: isDev,
      nodeIntegration: true,
      preload: __dirname + SETTINGS.SCRIPTS.PRELOAD,
      webSecurity: false
    }
  });

  mainWindow.setAspectRatio(width / height);
  // mainWindow.loadFile(`${__dirname}/build/index.html`);

  console.log(`${__dirname}/build/index.html`);

  if (isDev) {
    mainWindow.loadURL(SETTINGS.LOAD_URL.LOCAL);
  } else {
    mainWindow.loadFile(`${__dirname}${SETTINGS.LOAD_URL.BUILD}`);
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("minimize", event => {
    // event.preventDefault();
    // mainWindow.hide();
  });

  mainWindow.on("closed", () => {
    electronApp.quit();
    mainWindow = null;
  });
});
