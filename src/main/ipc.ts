import { ipcMain } from "electron";

ipcMain.on("fetch-document", (event, params) => {
  console.log("params", params);
});

ipcMain.handle("get-list", async (event, params) => {
  return "list";
});
