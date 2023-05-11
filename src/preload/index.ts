import { contextBridge, ipcRenderer } from "electron";
import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";

// eslint-disable-next-line prettier/prettier
declare global {
  export interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  fetchDocument(params: any) {
    return ipcRenderer.send("fetch-document", params);
  },

  getList() {
    return ipcRenderer.invoke("get-list");
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
