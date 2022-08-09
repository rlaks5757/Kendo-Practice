import React, { useState } from "react";
import { TileLayout } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
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
import "@progress/kendo-theme-default/dist/all.css";

const TileLayoutMain = () => {
  const [selected, setSelected] = useState(false);

  const [positionData, setPositionData] = useState([
    {
      col: 1,
      colSpan: 3,
      rowSpan: 1,
      order: 0,
    },
    {
      col: 1,
      colSpan: 2,
      rowSpan: 1,
      order: 1,
    },
    {
      col: 1,
      colSpan: 2,
      rowSpan: 2,
      order: 2,
    },
    {
      col: 4,
      colSpan: 1,
      rowSpan: 1,
      order: 3,
    },
    {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
      order: 4,
    },
    {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
      order: 5,
    },
    {
      col: 4,
      colSpan: 1,
      rowSpan: 2,
      order: 6,
    },
    {
      col: 3,
      colSpan: 2,
      rowSpan: 1,
      order: 7,
    },
  ]);

  const tiles = [
    {
      header: "Page Views",
      body: <PageViewsChart data={pageViews} positionData={positionData[0]} />,
      reorderable: !selected,
    },
    {
      header: "Most Visited Pages",
      body: <PopularPagesChart data={pageViews} />,
      reorderable: !selected,
    },
    {
      header: "Users by Channel",
      body: <UsersGrid data={channelUsers} />,
      reorderable: !selected,
    },
    {
      header: "Conversion Rate",
      body: (
        <div>
          <ConversionRate data={channelUsers} />
        </div>
      ),
      reorderable: !selected,
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
    },
    {
      header: "Visitors",
      body: <VisitorsDonut data={visitors} />,
      reorderable: !selected,
    },
    {
      header: "Conversions This Month",
      body: <ConversionsChart data={conversions} />,
      reorderable: !selected,
    },
  ];

  const handleReposition = (e) => {
    setPositionData(e.value);
    console.log(positionData);
  };

  return (
    <>
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
    </>
  );
};

export default TileLayoutMain;
