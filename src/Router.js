import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TileLayoutMain from "./TileLayout/TileLayout";
import Milestone from "./GoogleChart/MileStone";
import Milestone2 from "./GoogleChart/MileStone2";
import KendoTimeLine from "./KendoTimeLine/KendoTimeLine";
import ReactTimeLine from "./ReactTimeLine/ReactTimeLine";
import ReactTimeLine2 from "./ReactTimeLine copy/ReactTimeLine2";
import ReactTimeLineQuality from "./ReactTimeLineQuality/ReactTimeLineQuality";
import OrgChart from "./OrgChart/OrgChart";
import Meeting4 from "./Practice/Meeting4";
import Meeting42 from "./Practice/Meeting4_2";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TileLayoutMain />} />
        <Route path="/mile" element={<Milestone />} />
        <Route path="/mile2" element={<Milestone2 />} />
        <Route path="/time" element={<KendoTimeLine />} />
        <Route path="/time2" element={<ReactTimeLine />} />
        <Route path="/time3/:id" element={<ReactTimeLine2 />} />
        <Route path="/qtime3/:id" element={<ReactTimeLineQuality />} />
        <Route path="/org" element={<OrgChart />} />
        <Route path="/meeting/:project_code" element={<Meeting4 />} />
        <Route path="/meeting2/:project_code" element={<Meeting42 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
