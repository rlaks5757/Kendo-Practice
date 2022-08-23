import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timeline from "react-timelines";
import moment from "moment";
import axios from "axios";
import DialogComponent from "./DialogComponent";
import Url from "../url";
import "react-timelines/lib/css/style.css";
import "./ReactTimeLine2.scss";

const now = new Date();

const MIN_ZOOM = 0;
const MAX_ZOOM = 20;

const ReactTimeLine2 = () => {
  const params = useParams();

  const [timeBar, setTimeBar] = useState([]);
  const [option, setOption] = useState({});
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [toggleDialog, setToggleDiaglog] = useState(false);
  const [dialogContents, setDialogContents] = useState({});
  const [projectStartEnd, setProjectStartEnd] = useState({
    start: "",
    end: "",
  });

  const clickElement = (element) => {
    handleDialog();
    setDialogContents(element);
  };

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

  useEffect(() => {
    const axiosData = async () => {
      const unifierData = await axios.get(`${Url}/timeLine/${params.id}`);

      const unifierDataResult = await unifierData.data.data1.data;

      const unifierDataResult2 = await unifierData.data.data2.data;

      const timeLineDataBase = unifierDataResult.map((com, idx) => {
        return {
          id: `track-${idx + 2}`,
          title: com.d_permit_related_law,
          elements: com._bp_lineitems
            .filter((com1) => com1.KeyMilestone_srb === "Yes")
            .map((com2, idx2) => {
              return {
                id: `t-${idx + 2}-el-${idx2 + 1}`,
                title: com2.d_permit_name,
                start: new Date(com2.PlanSubmissionDate),
                end:
                  com2.PlanSubmissionDate === com2.PlanObtainedDate
                    ? new Date(
                        `${com2.PlanObtainedDate.slice(0, 10)} 23:00:00
                      `
                      )
                    : new Date(com2.PlanObtainedDate),
                style: {
                  backgroundColor: "#FE7F2D",
                  color: "#000000",
                  borderRadius: "4px",
                  boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
                  textTransform: "capitalize",
                },
                d_permit_process_due: com2.d_permit_process_due,
                d_permit_related_agency: com2.d_permit_related_agency,
                d_permit_lead_company: com2.d_permit_lead_company,
              };
            }),
        };
      });

      const timeLineDataResult = timeLineDataBase.filter(
        (com) => com.elements.length > 0
      );

      const milestoneData = {
        id: "track-1",
        title: "MileStone",
        elements: unifierDataResult2.map((com, idx) => {
          return {
            id: idx,
            title: com.genMilestoneDesc,
            start: new Date(com.plan_date),
            end: new Date(
              `${com.plan_date.slice(0, 10)} 23:00:00
            `
            ),
            style: {
              backgroundColor: "transparent",
              color: "#000000",
              borderRadius: "4px",
              textTransform: "capitalize",
              textAlign: "center",
            },
            position: idx % 2 === 0 ? "up" : "down",
          };
        }),
      };

      setOption({
        open: false,
        zoom: 0,
        tracks: [milestoneData, ...timeLineDataResult],
      });

      //Start & End Date Setting
      const startEndDateArr = [];

      unifierDataResult2.forEach((com) => {
        startEndDateArr.push(new Date(com.plan_date));
      });

      timeLineDataResult.forEach((com) => {
        com.elements.forEach((com2) => {
          startEndDateArr.push(com2.start);
          startEndDateArr.push(com2.end);
        });
      });

      const startEndDateSorting = startEndDateArr.sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const startDate = startEndDateSorting[0];
      const endDate = startEndDateSorting[startEndDateSorting.length - 1];

      /**
       * Start Date을 기준으로 시작 분기를 반환하는 함수
       * @param {Date} date
       */
      const settingStartDate = (date) => {
        const targetDate = new Date(date);
        targetDate.setDate(1);

        const month = new Date(date).getMonth();

        if (month === 0 && month <= 2) {
          targetDate.setFullYear(targetDate.getFullYear() - 1);
          targetDate.setMonth(9);
        } else if (month > 2 && month <= 5) {
          targetDate.setMonth(0);
        } else if (month > 5 && month <= 8) {
          targetDate.setMonth(3);
        } else if (month > 8 && month <= 11) {
          targetDate.setMonth(6);
        }

        setStart(new Date(targetDate));
      };

      /**
       * End Date을 기준으로 종료 분기를 반환하는 함수
       * @param {Date} date
       */
      const settingEndDate = (date) => {
        const targetDate = new Date(date);

        const month = new Date(date).getMonth();

        if (month === 0 && month <= 2) {
          targetDate.setMonth(5);
        } else if (month > 2 && month <= 5) {
          targetDate.setMonth(8);
        } else if (month > 5 && month <= 8) {
          targetDate.setMonth(11);
        } else if (month > 8 && month <= 11) {
          targetDate.setFullYear(targetDate.getFullYear() + 1);
          targetDate.setMonth(2);
        }

        const lastDay = new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          0
        ).getDate();

        targetDate.setDate(lastDay);

        setEnd(new Date(targetDate));
      };

      settingStartDate(startDate);
      settingEndDate(endDate);

      setProjectStartEnd((prev) => {
        return { ...prev, start: startDate, end: endDate };
      });
    };

    axiosData();
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

          const spans = document.createElement("span");
          spans.className = "rt-element__title2";
          spans.innerHTML = moment(option.tracks[0].elements[idx].start).format(
            "MM-DD-YYYY"
          );

          com.firstChild.firstChild.appendChild(spans);

          if (option.tracks[0].elements[idx].position === "up") {
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

          if (option.tracks[0].elements[idx].position === "up") {
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
    const NUM_OF_YEARS = end.getFullYear() - start.getFullYear() + 1;
    const MONTHS_PER_YEAR = 12;
    const START_YEAR = start.getFullYear();

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
  }, [end, start]);

  const handleDialog = () => {
    setToggleDiaglog((prev) => !prev);
  };

  return (
    <div className="reactTimeLine">
      <h1 className="title">React Timelines</h1>
      {option.tracks !== undefined && (
        <Timeline
          scale={{
            start,
            end,
            zoom: option.zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM,
          }}
          isOpen={option.open}
          toggleOpen={handleToggleOpen}
          zoomIn={handleZoomIn}
          zoomOut={handleZoomOut}
          clickElement={clickElement}
          timebar={timeBar}
          tracks={option.tracks}
          now={now}
          enableSticky={false}
        />
      )}
      {toggleDialog && (
        <DialogComponent
          handleDialog={handleDialog}
          dialogContents={dialogContents}
          projectStartEnd={projectStartEnd}
        ></DialogComponent>
      )}
    </div>
  );
};

export default ReactTimeLine2;
