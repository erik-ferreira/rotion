import { contextBridge, ipcRenderer } from "electron"

import { IPC } from "../shared/constants/ipc"
import {
  SaveDocumentRequest,
  FetchDocumentRequest,
  DeleteDocumentRequest,
  FetchDocumentResponse,
  CreateDocumentResponse,
  FetchAllDocumentsResponse,
} from "../shared/types/ipc"

declare global {
  export interface Window {
    api: typeof api
  }
}

const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENT.FETCH_ALL)
  },

  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENT.FETCH, req)
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENT.CREATE)
  },

  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENT.SAVE, req)
  },

  deleteDocument(req: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENT.DELETE, req)
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on("new-document", callback)

    return () => {
      ipcRenderer.off("new-document", callback)
    }
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
