import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TileLayoutMain from "./TileLayout/TileLayout";
import CWP from "./TestTable/CWP";
import Milestone2 from "./TestTable/MileStone";
import ActStatus from "./TestTable/ActStatus";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TileLayoutMain />} />
        <Route path="/:project_code" element={<CWP />} />
        <Route path="/:project_code/act" element={<ActStatus />} />
        <Route path="/:project_code/mile" element={<Milestone2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
