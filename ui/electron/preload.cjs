const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('ampelDesktop', {
  electronVersion: process.versions.electron,
});
