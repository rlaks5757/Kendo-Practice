import React from "react";
import ReactDOM from "react-dom/client";
import TileLayoutMain from "./TileLayout/TileLayout";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
