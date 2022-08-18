import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timeline from "react-timelines";
import "react-timelines/lib/css/style.css";
import "./ReactTimeLine.scss";
import moment from "moment";

const now = new Date();

const clickElement = (element) =>
  alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);

const MIN_ZOOM = 0;
const MAX_ZOOM = 20;

const ReactTimeLine2 = () => {
  const [timeBar, setTimeBar] = useState([]);
  const params = useParams();

  const [option, setOption] = useState({});

  const handleToggleOpen = () => {
    setOption((prev) => {
      return { ...prev, open: !prev.open };
    });
  };

  const handleZoomIn = () => {
    setOption((prev) => {
      return { ...prev, zoom: Math.min(prev.zoom + 1, MAX_ZOOM) };
    });
  };

  const handleZoomOut = () => {
    setOption((prev) => {
      return { ...prev, zoom: Math.max(prev.zoom - 1, MIN_ZOOM) };
    });
  };

  const handleToggleTrackOpen = (track) => {
    setOption((state) => {
      const tracksById = {
        ...state.tracksById,
        [track.id]: {
          ...track,
          isOpen: !track.isOpen,
        },
      };

      return {
        tracksById,
        tracks: data,
      };
    });
  };

  const start = new Date("2022-01-01");
  const end = new Date("2023-12-31");

  useEffect(() => {
    setOption({
      open: false,
      zoom: 0,
      tracks: data,
    });
  }, [params.id]);

  useEffect(() => {
    const timeLine = document.querySelector(".rt-tracks");
    if (timeLine !== null) {
      timeLine.firstChild.firstChild.childNodes.forEach((com, idx) => {
        if (com.firstChild.firstChild.className === "rt-element__content") {
          com.firstChild.firstChild.className = "rt-element__content milestone";
          com.firstChild.firstChild.style.width = "100px";
          com.firstChild.firstChild.style.position = "absolute";
          com.firstChild.firstChild.style.left = "-49px";
          com.firstChild.firstChild.style.fontSize = "13px";

          const spans = document.createElement("div");
          spans.className = "rt-element__title2";
          spans.style.alignItems = "self-end";
          spans.innerHTML = moment(data[0].elements[idx].start).format(
            "MM-DD-YYYY"
          );

          com.firstChild.firstChild.appendChild(spans);

          if (data[0].elements[idx].position === "up") {
            com.firstChild.firstChild.style.top = "0px";
          } else {
            com.firstChild.firstChild.style.top = "15px";
          }

          const divs = document.createElement("div");
          divs.style.width = "100%";
          divs.style.position = "absolute";
          divs.style.left = "-14px";

          const icons = document.createElement("span");
          icons.className = "k-icon k-i-circle";

          divs.appendChild(icons);

          if (data[0].elements[idx].position === "up") {
            com.style.top = "-5px";
            com.appendChild(divs);
          } else {
            com.style.top = "35px";
            com.prepend(divs);
          }
        }
      });
    }
  }, [option.tracks]);

  useEffect(() => {
    const MONTH_NAMES = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const QUARTERS_PER_YEAR = 4;
    const MONTHS_PER_QUARTER = 3;
    const NUM_OF_YEARS = 2;
    const MONTHS_PER_YEAR = 12;
    const START_YEAR = 2022;

    const addMonthsToYear = (year, monthsToAdd) => {
      let y = year;
      let m = monthsToAdd;
      while (m >= MONTHS_PER_YEAR) {
        m -= MONTHS_PER_YEAR;
        y += 1;
      }
      return { year: y, month: m + 1 };
    };

    const addMonthsToYearAsDate = (year, monthsToAdd) => {
      const r = addMonthsToYear(year, monthsToAdd);
      return new Date(`${r.year}-${r.month}`);
    };

    const buildQuarterCells = () => {
      const v = [];
      for (let i = 0; i < QUARTERS_PER_YEAR * NUM_OF_YEARS; i += 1) {
        const quarter = (i % 4) + 1;
        const startMonth = i * MONTHS_PER_QUARTER;
        const s = addMonthsToYear(START_YEAR, startMonth);
        const e = addMonthsToYear(START_YEAR, startMonth + MONTHS_PER_QUARTER);
        v.push({
          id: `${s.year}-q${quarter}`,
          title: `Q${quarter} ${s.year}`,
          start: new Date(`${s.year}-${s.month}-01`),
          end: new Date(`${e.year}-${e.month}-01`),
        });
      }
      return v;
    };

    const buildMonthCells = () => {
      const v = [];
      for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
        const startMonth = i;
        const start = addMonthsToYearAsDate(START_YEAR, startMonth);
        const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1);
        v.push({
          id: `m${startMonth}`,
          title: MONTH_NAMES[i % 12],
          start,
          end,
        });
      }
      return v;
    };

    const buildTimebar1 = () => [
      {
        id: "quarters",
        title: "Quarters",
        cells: buildQuarterCells(),
        style: {},
      },
      {
        id: "months",
        title: "Months",
        cells: buildMonthCells(),
        useAsGrid: true,
        style: {},
      },
    ];

    setTimeBar(buildTimebar1());
  }, []);

  return (
    <div className="app">
      <h1 className="title">React Timelines</h1>
      {option.tracks !== undefined && (
        <Timeline
          scale={{
            start,
            end,
            // zoom: option.zoom,
            // zoomMin: MIN_ZOOM,
            // zoomMax: MAX_ZOOM,
          }}
          isOpen={option.open}
          toggleOpen={handleToggleOpen}
          // zoomIn={handleZoomIn}
          // zoomOut={handleZoomOut}
          clickElement={clickElement}
          // clickTrackButton={(track) => {
          //   // eslint-disable-next-line no-alert
          //   alert(JSON.stringify(track));
          // }}
          timebar={timeBar}
          tracks={option.tracks}
          now={now}
          toggleTrackOpen={handleToggleTrackOpen}
          // enableSticky
          // scrollToNow
        />
      )}
    </div>
  );
};

export default ReactTimeLine2;

const data = [
  {
    id: "track-1",
    title: "MileStone",
    elements: [
      {
        id: "0",
        title: "선착수 공문 접수",
        start: new Date("05-02-2022 00:00:00"),
        end: new Date("05-02-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "up",
      },
      {
        id: "1",
        title: "교통영향평가 접수",
        start: new Date("05-27-2022 00:00:00"),
        end: new Date("05-27-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
      {
        id: "2",
        title: "착공",
        start: new Date("07-25-2022 00:00:00"),
        end: new Date("07-25-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "up",
      },
      {
        id: "3",
        title: "기초",
        start: new Date("08-22-2022 00:00:00"),
        end: new Date("08-22-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
      {
        id: "4",
        title: "골조",
        start: new Date("09-14-2022 00:00:00"),
        end: new Date("09-14-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "up",
      },
      {
        id: "5",
        title: "MEP",
        start: new Date("10-17-2022 00:00:00"),
        end: new Date("10-17-2022 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
      {
        id: "6",
        title: "E/V",
        start: new Date("01-02-2023 00:00:00"),
        end: new Date("01-02-2023 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "up",
      },
      {
        id: "7",
        title: "생산장비 반입",
        start: new Date("02-28-2023 00:00:00"),
        end: new Date("02-28-2023 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
      {
        id: "8",
        title: "준공(제2연구동)",
        start: new Date("05-31-2023 00:00:00"),
        end: new Date("05-31-2023 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "up",
      },
      {
        id: "9",
        title: "준공(제2충방전등)",
        start: new Date("08-31-2023 00:00:00"),
        end: new Date("08-31-2023 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
      {
        id: "10",
        title: "준공(Phase2)",
        start: new Date("11-30-2023 00:00:00"),
        end: new Date("11-30-2023 23:00:00"),
        style: {
          backgroundColor: "transparent",
          color: "#000000",
          borderRadius: "4px",
          textTransform: "capitalize",
          textAlign: "center",
        },
        position: "down",
      },
    ],
  },
  {
    id: "track-2",
    title: "교통영향평가",
    elements: [
      {
        id: "t-1-el-1",
        title: "교평 제출 및 처리통보",
        start: new Date("04-05-2022 00:00:00"),
        end: new Date("05-15-2022 00:00:00"),
        style: {
          backgroundColor: "#FE7F2D",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
      {
        id: "t-1-el-2",
        title: "본심의",
        start: new Date("05-30-2022 00:00:00"),
        end: new Date("07-15-2022 00:00:00"),
        style: {
          backgroundColor: "#FCCA46",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
    ],
  },
  {
    id: "track-3",
    title: "건축(Phase.1)",
    elements: [
      {
        id: "0",
        title: "건축허가",
        start: new Date("07-15-2022 00:00:00"),
        end: new Date("08-30-2022 00:00:00"),
        style: {
          backgroundColor: "#FE7F2D",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
      {
        id: "1",
        title: "건축착공신고",
        start: new Date("10-15-2022 00:00:00"),
        end: new Date("10-31-2022 00:00:00"),
        style: {
          backgroundColor: "#FCCA46",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
      {
        id: "2",
        title: "건축사용신고",
        start: new Date("05-01-2023 00:00:00"),
        end: new Date("05-31-2023 00:00:00"),
        style: {
          backgroundColor: "#FCCA46",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
    ],
  },
  {
    id: "track-4",
    title: "유해위험방지계획서",
    elements: [
      {
        id: "0",
        title: "공작물축조신고",
        start: new Date("06-15-2023 00:00:00"),
        end: new Date("06-24-2023 00:00:00"),
        style: {
          backgroundColor: "#FE7F2D",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
    ],
  },
  {
    id: "track-5",
    title: "건축(Phase.2)",
    elements: [
      {
        id: "0",
        title: "건축허가",
        start: new Date("10-15-2022 00:00:00"),
        end: new Date("11-30-2022 00:00:00"),
        style: {
          backgroundColor: "#FE7F2D",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
      {
        id: "1",
        title: "건축착공신고",
        start: new Date("01-15-2023 00:00:00"),
        end: new Date("01-31-2023 00:00:00"),
        style: {
          backgroundColor: "#FCCA46",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
      {
        id: "2",
        title: "건축사용신고",
        start: new Date("08-01-2023 00:00:00"),
        end: new Date("08-31-2023 00:00:00"),
        style: {
          backgroundColor: "#FCCA46",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
    ],
  },
  {
    id: "track-6",
    title: "환경인허가",
    elements: [
      {
        id: "0",
        title: "가동개시신고",
        start: new Date("10-31-2023 00:00:00"),
        end: new Date("10-31-2023 23:00:00"),
        style: {
          backgroundColor: "#FE7F2D",
          color: "#000000",
          borderRadius: "4px",
          boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
          textTransform: "capitalize",
        },
      },
    ],
  },
];
