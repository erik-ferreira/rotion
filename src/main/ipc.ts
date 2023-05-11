import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import { FetchAllDocumentsResponse } from "../shared/types/ipc";

ipcMain.handle(
  IPC.DOCUMENT.FETCH_ALL,
  async (event, params): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: "1", title: "Ignite", content: "" },
        { id: "2", title: "Lab", content: "" },
        { id: "3", title: "NLW", content: "" },
        { id: "4", title: "Docs", content: "" },
      ],
    };
    // eslint-disable-next-line prettier/prettier
  }
);
