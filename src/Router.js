import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TileLayoutMain from "./TileLayout/TileLayout";
import CWP from "./TestTable/CWP";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TileLayoutMain />} />
        <Route path="/:project_code" element={<CWP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
