import React, { useState, useEffect, useMemo } from "react";
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import {
  conversions,
  channelUsers,
  pageViews,
  visitors,
} from "./tileLayout-data";
import ConversionRate from "./Layout/ConversionRate";
import ConversionsChart from "./Layout/ConversionsChart";
import PageViewsChart from "./Layout/PageViewsChart";
import PopularPagesChart from "./Layout/PopularPagesChart";
import UsersGrid from "./Layout/UsersGrid";
import VisitorsDonut from "./Layout/VisitorsDonut";
import useViewPort from "../Hooks/useViewPort";
import "hammerjs";
import "@progress/kendo-theme-default/dist/all.css";
import "./TileLayout.scss";

const TileLayoutMain = () => {
  const { width } = useViewPort();

  const [selected, setSelected] = useState(false);

  const [positionData, setPositionData] = useState(pcView);

  const [tiles, setTiles] = useState([]);

  const [tilesToggle, setTilesToggle] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const tilesData = useMemo(
    () => [
      {
        header: (
          <div className="tileHeader">
            Page Views
            <FontAwesomeIcon
              icon={faTable}
              size="lg"
              onClick={() => hadleTileToggle(0)}
            />
          </div>
        ),
        body: (
          <PageViewsChart
            data={pageViews}
            positionData={positionData[0]}
            tilesToggle={tilesToggle[0]}
            setTilesToggle={setTilesToggle}
          />
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Most Visited Pages",
        body: (
          <PopularPagesChart data={pageViews} positionData={positionData[1]} />
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Users by Channel",
        body: <UsersGrid data={channelUsers} positionData={positionData[2]} />,
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Conversion Rate",
        body: (
          <div>
            <ConversionRate
              data={channelUsers}
              positionData={positionData[3]}
            />
          </div>
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Currently",
        body: (
          <div>
            <h3
              style={{
                marginBottom: "-1px",
                marginTop: "-10px",
              }}
            >
              2399
            </h3>
            <p>Active users right now</p>
          </div>
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Bounce Rate",
        body: (
          <div>
            <h3
              style={{
                marginBottom: "-1px",
                marginTop: "-10px",
              }}
            >
              55%
            </h3>
            <p>
              The percentage of all sessions on your site in which users viewed
              only a single page.
            </p>
          </div>
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Visitors",
        body: <VisitorsDonut data={visitors} positionData={positionData[6]} />,
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
      {
        header: "Conversions This Month",
        body: (
          <ConversionsChart data={conversions} positionData={positionData[7]} />
        ),
        reorderable: !selected,
        resizable: width > 768 ? true : "vertical",
      },
    ],
    [positionData, selected, width, tilesToggle]
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

  const hadleTileToggle = (item) => {
    setTilesToggle((prev) => {
      return {
        ...prev,
        [item]: !prev[item],
      };
    });
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

export default TileLayoutMain;

const pcView = [
  {
    col: 1,
    colSpan: 3,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 4,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 3,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 3,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 4,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    col: 3,
    colSpan: 2,
    rowSpan: 1,
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
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 1,
  },
];
