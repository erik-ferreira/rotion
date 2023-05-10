import { Router, Route } from "electron-router-dom";

import { Blank } from "./pages/blank";
import { Document } from "./pages/document";

import { DefaultLayout } from "./layout/default";

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Blank />} />
          <Route path="/document" element={<Document />} />
        </Route>
      }
    />
  );
}
