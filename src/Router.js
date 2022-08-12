import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TileLayoutMain from "./TileLayout/TileLayout";

import Milestone2 from "./GoogleChart/MileStone";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TileLayoutMain />} />
        <Route path="/mile" element={<Milestone2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
