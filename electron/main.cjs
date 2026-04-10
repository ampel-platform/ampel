const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const { createRequestHandler } = require('@react-router/express');
const { app, BrowserWindow, dialog } = require('electron');

const DEV_SERVER_URL = process.env.ELECTRON_RENDERER_URL;
const SERVER_PORT = Number.parseInt(process.env.ELECTRON_SERVER_PORT ?? '3003', 10);
const START_PATH_RAW = process.env.ELECTRON_START_PATH ?? '/alerts/cases/0001949132';
const START_PATH = START_PATH_RAW.startsWith('/') ? START_PATH_RAW : `/${START_PATH_RAW}`;
const SERVER_HOST = '127.0.0.1';
const SERVER_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

let serverInstance = null;

async function startReactRouterServer() {
  if (serverInstance || DEV_SERVER_URL) {
    return;
  }

  const appPath = app.getAppPath();
  const serverBuildPath = path.join(appPath, 'build', 'server', 'index.js');
  const buildModule = await import(pathToFileURL(serverBuildPath).href);
  const publicPath = buildModule.publicPath ?? '/';
  const rawAssetsBuildDirectory = buildModule.assetsBuildDirectory ?? '../client';
  const assetDirFromServer = path.resolve(path.dirname(serverBuildPath), rawAssetsBuildDirectory);
  const assetDirFromAppRoot = path.resolve(appPath, rawAssetsBuildDirectory);
  const assetsBuildDirectory = fs.existsSync(assetDirFromServer)
    ? assetDirFromServer
    : assetDirFromAppRoot;

  const serverApp = express();
  serverApp.disable('x-powered-by');
  serverApp.use(compression());
  serverApp.use(
    path.posix.join(publicPath, 'assets'),
    express.static(path.join(assetsBuildDirectory, 'assets'), {
      immutable: true,
      maxAge: '1y',
    }),
  );
  serverApp.use(publicPath, express.static(assetsBuildDirectory));
  serverApp.use(express.static(path.join(appPath, 'public'), { maxAge: '1h' }));
  serverApp.use(morgan('tiny'));
  serverApp.all(
    '*',
    createRequestHandler({
      build: buildModule,
      mode: process.env.NODE_ENV ?? 'production',
    }),
  );

  serverInstance = await new Promise((resolve, reject) => {
    const server = serverApp.listen(SERVER_PORT, SERVER_HOST, () => resolve(server));
    server.on('error', reject);
  });
}

function stopReactRouterServer() {
  if (!serverInstance) {
    return;
  }

  serverInstance.close();
  serverInstance = null;
}

function getStartUrl(baseUrl) {
  return new URL(START_PATH, baseUrl).toString();
}

function getWindowIconPath() {
  const icoPath = path.join(app.getAppPath(), 'assets', 'Lampe_Logo_Vektor.ico');
  if (fs.existsSync(icoPath)) {
    return icoPath;
  }

  const svgPath = path.join(app.getAppPath(), 'assets', 'Lampe_Logo_Vektor.svg');
  return fs.existsSync(svgPath) ? svgPath : undefined;
}

function getAppTitlePrefix() {
  return 'AMPEL-CDSS';
}

function updateWindowTitle(window, urlValue) {
  const titlePrefix = getAppTitlePrefix();
  try {
    const url = new URL(urlValue);
    const visiblePath = `${url.pathname}${url.search}${url.hash}`;
    window.setTitle(`${titlePrefix} - ${visiblePath}`);
  } catch {
    window.setTitle(titlePrefix);
  }
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 640,
    icon: getWindowIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const onNavigation = (_event, urlValue) => {
    updateWindowTitle(window, urlValue);
  };
  window.webContents.on('did-navigate', onNavigation);
  window.webContents.on('did-navigate-in-page', onNavigation);

  if (DEV_SERVER_URL) {
    await window.loadURL(getStartUrl(DEV_SERVER_URL));
    window.webContents.openDevTools({ mode: 'detach' });
    return;
  }

  await window.loadURL(getStartUrl(SERVER_URL));
}

app.whenReady().then(async () => {
  try {
    await startReactRouterServer();
    await createWindow();

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    });
  } catch (error) {
    console.error('Failed to start desktop app:', error);
    dialog.showErrorBox(
      'Ampel UI startup failed',
      error instanceof Error ? (error.stack ?? error.message) : String(error),
    );
    app.quit();
  }
});

app.on('before-quit', () => {
  stopReactRouterServer();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
