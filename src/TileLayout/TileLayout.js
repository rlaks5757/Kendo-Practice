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

  useEffect(() => {
    const filterData = testData.filter((com) => {
      return com.materialName !== "";
    });

    const dataMap = filterData.map((com) => {
      return com.materialName;
    });

    console.log([...new Set(dataMap)]);
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
      {testData.map((com) => {
        return com === "사용안함" ? (
          <div>사용안한다고</div>
        ) : (
          <div>사용하는거</div>
        );
      })}
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

const testData = [
  {
    name: "호퍼(좌좌)",
    isOff: false,
    materialName: "비트   시그니처",
    max: 90,
    usage: 70,
    materialdate: null,
  },
  {
    name: "호퍼(좌우)",
    isOff: false,
    materialName: "브라질 카쇼에이라",
    max: 90,
    usage: 22,
    materialdate: null,
  },
  {
    name: "호퍼(우좌)",
    isOff: false,
    materialName: "비트   시그니처",
    max: 90,
    usage: 75,
    materialdate: null,
  },
  {
    name: "호퍼(우우)",
    isOff: false,
    materialName: "엑셀소 디카페인",
    max: 90,
    usage: 25,
    materialdate: null,
  },
  {
    name: "우유(좌)",
    isOff: false,
    materialName: "우유",
    max: 48,
    usage: 11,
    materialdate: null,
  },
  {
    name: "우유(우)",
    isOff: false,
    materialName: "우유",
    max: 48,
    usage: 19,
    materialdate: null,
  },
  {
    name: "제빙기1(좌)",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "제빙기2(우)",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "디스펜서(좌)",
    isOff: false,
    materialName: "컵",
    max: 225,
    usage: 46,
    materialdate: null,
  },
  {
    name: "디스펜서(우)",
    isOff: false,
    materialName: "컵",
    max: 225,
    usage: 186,
    materialdate: null,
  },
  {
    name: "쥬스디스펜서(좌)",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "쥬스디스펜서(우)",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "노즐1",
    isOff: false,
    materialName: "사용 안함",
    max: 0,
    usage: 0,
    materialdate: null,
  },
  {
    name: "노즐2",
    isOff: false,
    materialName: "바나나시럽",
    max: 20,
    usage: 0,
    materialdate: null,
  },
  {
    name: "노즐3",
    isOff: false,
    materialName: "초코시럽",
    max: 21,
    usage: 10,
    materialdate: null,
  },
  {
    name: "노즐4",
    isOff: false,
    materialName: "바닐라시럽",
    max: 35,
    usage: 9,
    materialdate: null,
  },
  {
    name: "노즐5",
    isOff: false,
    materialName: "청포도시럽",
    max: 22,
    usage: 10,
    materialdate: null,
  },
  {
    name: "노즐6",
    isOff: false,
    materialName: "스위티자몽시럽",
    max: 21,
    usage: 6,
    materialdate: null,
  },
  {
    name: "노즐7",
    isOff: true,
    materialName: "레몬블랙티 시럽",
    max: 20,
    usage: 0,
    materialdate: null,
  },
  {
    name: "노즐8",
    isOff: false,
    materialName: "파인애플시럽",
    max: 20,
    usage: 14,
    materialdate: null,
  },
  {
    name: "픽업1",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "픽업2",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "픽업3",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "픽업4",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "픽업5",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "픽업6",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대1",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대2",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대3",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대4",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대5",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "보관대6",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "태블릿1",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
  {
    name: "태블릿2",
    isOff: false,
    materialName: "",
    max: -1,
    usage: -1,
    materialdate: null,
  },
];
