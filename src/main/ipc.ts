import { ipcMain } from "electron";

ipcMain.handle("fetch-document", async (event, params) => {
  return [
    { id: "1", title: "Ignite" },
    { id: "2", title: "Lab" },
    { id: "3", title: "NLW" },
    { id: "4", title: "Docs" },
  ];
});
