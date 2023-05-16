import { ipcMain } from "electron"
import { randomUUID } from "node:crypto"

import { store } from "./store"
import {
  Document,
  SaveDocumentRequest,
  FetchDocumentRequest,
  DeleteDocumentRequest,
  FetchDocumentResponse,
  CreateDocumentResponse,
  FetchAllDocumentsResponse,
} from "../shared/types/ipc"
import { IPC } from "../shared/constants/ipc"

ipcMain.handle(
  IPC.DOCUMENT.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get("documents")),
    }
  }
)

ipcMain.handle(
  IPC.DOCUMENT.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document: Document = store.get(`documents.${id}`)

    return {
      data: document,
    }
  }
)

ipcMain.handle(
  IPC.DOCUMENT.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: Document = { id, title: "Untitled", headings: [] }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  }
)

ipcMain.handle(
  IPC.DOCUMENT.SAVE,
  async (
    _,
    { id, title, content, headings }: SaveDocumentRequest
  ): Promise<void> => {
    store.set(`documents.${id}`, { id, title, content, headings })
  }
)

ipcMain.handle(
  IPC.DOCUMENT.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`)
  }
)
