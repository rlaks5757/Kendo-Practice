import React, { useState, useEffect, useMemo } from "react";
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import useViewPort from "../Hooks/useViewPort";
import "hammerjs";
import "@progress/kendo-theme-default/dist/all.css";
import ReactTimeLineQuality from "../ReactTimeLineQuality/ReactTimeLineQuality";
import "./QualityTileLayout.scss";

const QualityTileLayout = () => {
  const { width } = useViewPort();

  const [selected, setSelected] = useState(false);

  const [positionData, setPositionData] = useState(pcView);

  const [tiles, setTiles] = useState([]);

  const tilesData = useMemo(
    () => [
      {
        header: <div>Quality Process</div>,
        body: (
          <div className="reactTimeLineQualityBody">
            <ReactTimeLineQuality positionData={positionData} />
          </div>
        ),
        reorderable: !selected,
      },
      {
        header: "Lessons & Learned Status",
        body: "",
        reorderable: !selected,
      },
      {
        header: "Document Change Status",
        body: "",
        reorderable: !selected,
      },
      {
        header: "COPQ",
        body: "",
        reorderable: !selected,
      },
    ],
    [positionData, selected]
  );

  useEffect(() => {
    if (width > 768) {
      setPositionData(pcView);
    } else {
      setPositionData(mobileView);
    }
  }, [width]);

  useEffect(() => {
    setTiles(tilesData);
  }, [tilesData]);

  const handleReposition = (e) => {
    setPositionData(e.value);
  };

  return (
    <div className="titleLayout">
      <Button
        // togglable={true}
        onClick={() => setSelected(!selected)}
        disabled={selected}
      >
        고정
      </Button>
      <Button
        // togglable={true}
        onClick={() => setSelected(!selected)}
        disabled={!selected}
      >
        고정해제
      </Button>
      {positionData.length > 0 && (
        <TileLayout
          columns={4}
          rowHeight={255}
          positions={positionData}
          gap={{
            rows: 10,
            columns: 10,
          }}
          items={tiles}
          onReposition={handleReposition}
        />
      )}
    </div>
  );
};

export default QualityTileLayout;

const pcView = [
  {
    col: 1,
    colSpan: 4,
    rowSpan: 3,
    order: 1,
  },
  {
    col: 1,
    colSpan: 2,
    rowSpan: 1,
    order: 2,
  },
  {
    col: 3,
    colSpan: 1,
    rowSpan: 1,
    order: 3,
  },
  {
    col: 4,
    colSpan: 1,
    rowSpan: 1,
    order: 4,
  },
];

const mobileView = [
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 1,
    rowSpan: 1,
  },
];
