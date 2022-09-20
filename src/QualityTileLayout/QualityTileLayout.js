import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import useBreakpoint from "use-breakpoint";
import "hammerjs";
import "@progress/kendo-theme-default/dist/all.css";
import QualityCriticalProcess from "./QualityCriticalProcess/QualityCriticalProcess";
import "./QualityTileLayout.scss";

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const QualityTileLayout = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  const [selected, setSelected] = useState(false);

  const [positionData, setPositionData] = useState(viewTotal[breakpoint]);

  const [tiles, setTiles] = useState([]);

  const tilesData = useMemo(
    () => [
      {
        header: "Total Status",
        body: "",
        resizable: !selected,
        reorderable: !selected,
      },
      {
        header: "2",
        body: "",
        resizable: !selected,
        reorderable: !selected,
      },
      {
        header: "3",
        body: "",
        resizable: !selected,
        reorderable: !selected,
      },
      {
        header: "4",
        body: "",
        resizable: !selected,
        reorderable: !selected,
      },
      {
        header: "5",
        body: "",
        resizable: !selected,
        reorderable: !selected,
      },
      {
        header: <div>Quality Critical Process</div>,
        body: <QualityCriticalProcess positionData={positionData} />,
        resizable: !selected,
        reorderable: !selected,
      },
    ],
    [positionData, selected]
  );

  useEffect(() => {
    setPositionData(viewTotal[breakpoint]);
  }, [breakpoint]);

  useEffect(() => {
    setTiles(tilesData);
  }, [tilesData]);

  const handleReposition = useCallback((e) => {
    setPositionData(e.value);
  }, []);

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
          columns={8}
          rowHeight={255}
          positions={positionData}
          gap={{
            rows: 10,
            columns: 10,
          }}
          items={tiles}
          onReposition={handleReposition}
          autoFlow="row dense"
        />
      )}
    </div>
  );
};

export default QualityTileLayout;

const viewTotal = {
  desktop: [
    {
      col: 1,
      colSpan: 2,
      rowSpan: 2,
    },
    {
      col: 3,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 6,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 3,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 6,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 3,
    },
  ],
  tablet: [
    {
      col: 1,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 4,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 7,
      colSpan: 2,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 4,
      colSpan: 3,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 3,
    },
  ],
  mobile: [
    {
      col: 1,
      colSpan: 8,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 1,
    },
    {
      col: 1,
      colSpan: 8,
      rowSpan: 3,
    },
  ],
};
