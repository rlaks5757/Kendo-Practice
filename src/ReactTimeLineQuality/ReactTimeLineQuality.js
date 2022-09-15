import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Timeline from "react-timelines";
import axios from "axios";
import _ from "lodash";
import DialogComponent from "./DialogComponent";
import Url from "../url";
import "./ReactTimeLineQuality.scss";
import "react-timelines/lib/css/style.css";

const now = new Date();

const MIN_ZOOM = 1;
const MAX_ZOOM = 20;

const ReactTimeLineQuality = ({ positionData }) => {
  const params = useParams();

  const [timeBar, setTimeBar] = useState([]);
  const [option, setOption] = useState({});
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [projectStartEnd, setProjectStartEnd] = useState({
    projectName: "",
    start: "",
    end: "",
  });
  const [trackItems, setTrackItems] = useState([]);
  const [toggleDialog, setToggleDiaglog] = useState(false);
  const [dialogContents, setDialogContents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const unifierData = await axios.get(
        `${Url}/qualityProcess/${params.project_code}`
      );

      const axiosData =
        unifierData.data.data1[unifierData.data.data1.length - 1];
      console.log(unifierData);
      const createTracks = _.uniqBy(axiosData._bp_lineitems, "EngDisc_spd").map(
        (com, idx) => {
          return {
            id: `track-${idx}`,
            title: com.EngDisc_spd,
            isOpen: true,
            elements: [],
            tracks: createTrackItems(
              axiosData._bp_lineitems,
              com.EngDisc_spd,
              idx
            ),
          };
        }
      );

      setOption({
        open: false,
        zoom: 1,
        tracks: createTracks,
      });

      const trackItems_arr = [];

      createTracks.forEach((com) =>
        com.tracks.forEach((com2) =>
          com2.elements.forEach((com3) => trackItems_arr.push(com3))
        )
      );

      setTrackItems(trackItems_arr);

      const startEndDateArr = [];

      axiosData._bp_lineitems.forEach((com) => {
        startEndDateArr.push(new Date(com.plan_date));
        if (com.Actual_date !== null) {
          startEndDateArr.push(new Date(com.Actual_date));
        }
      });

      const startEndDateSorting = startEndDateArr.sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const startDate = startEndDateSorting[0];
      const endDate = startEndDateSorting[startEndDateSorting.length - 1];

      /**
       * Start Date을 기준으로 1분기 전을 반환하는 함수
       * @param {Date} date StartDate
       * @returns
       */
      const settingStartDate = (date) => {
        const targetDate = new Date(date);
        targetDate.setDate(1);

        const month = new Date(date).getMonth();

        if (month === 0 && month <= 2) {
          targetDate.setFullYear(targetDate.getFullYear() - 1);
          targetDate.setMonth(0);
        } else if (month > 2 && month <= 5) {
          targetDate.setMonth(3);
        } else if (month > 5 && month <= 8) {
          targetDate.setMonth(6);
        } else if (month > 8 && month <= 11) {
          targetDate.setMonth(9);
        }

        setStart(new Date(targetDate));
      };

      /**
       * End Date을 기준으로 1분기 후를 반환하는 함수
       * @param {Date} date StartDate
       * @returns
       */
      const settingEndDate = (date) => {
        const targetDate = new Date(date);

        const month = new Date(date).getMonth();

        if (month === 0 && month <= 2) {
          targetDate.setMonth(2);
        } else if (month > 2 && month <= 5) {
          targetDate.setMonth(5);
        } else if (month > 5 && month <= 8) {
          targetDate.setMonth(8);
        } else if (month > 8 && month <= 11) {
          targetDate.setFullYear(targetDate.getFullYear() + 1);
          targetDate.setMonth(11);
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

      if (axiosData) {
        const projectName = axiosData.project_projectname;

        setProjectStartEnd((prev) => {
          return { ...prev, projectName, start: startDate, end: endDate };
        });
      }
    };

    fetchData();
  }, [params, positionData]);

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

  useEffect(() => {
    const timeLine = document.querySelector(".rt-tracks");
    if (timeLine !== null) {
      const tracksNodes = timeLine.childNodes;

      tracksNodes.forEach((com, idx) => {
        if (com.firstChild.nextSibling !== null) {
          const targetChildNodes = com.firstChild.nextSibling.childNodes;
          targetChildNodes.forEach((com2, idx2) => {
            com2.firstChild.childNodes.forEach((com3, idx3) => {
              const targetTrack =
                option.tracks[idx].tracks[idx2].elements[idx3];

              const divs = document.createElement("div");
              divs.className = "trackIconBox";

              const icons = document.createElement("span");
              if (targetTrack.type === "plan") {
                icons.className = "k-icon k-i-circle qualityPlan";
              } else {
                icons.className = "k-icon k-i-circle qualityAct";
              }
              divs.appendChild(icons);
              com3.appendChild(divs);
            });
          });
        }
      });
    }
  }, [option]);

  const handleToggleOpen = () => {
    setOption((prev) => {
      return { ...prev, open: !prev.open };
    });
  };

  const handleZoomIn = useCallback(() => {
    setOption((prev) => {
      return { ...prev, zoom: Math.min(prev.zoom + 1, MAX_ZOOM) };
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setOption((prev) => {
      return { ...prev, zoom: Math.max(prev.zoom - 1, MIN_ZOOM) };
    });
  }, []);

  const handleToggleTrackOpen = (track) => {
    const targetTrackIdx = option.tracks.findIndex(
      (com) => com.id === track.id
    );

    option.tracks[targetTrackIdx].isOpen =
      !option.tracks[targetTrackIdx].isOpen;

    setOption((prev) => {
      return { ...prev, track: option.tracks };
    });
  };

  const clickElement = (element) => {
    handleDialog();
    setDialogContents(element);
  };

  const handleDialog = useCallback(() => {
    setToggleDiaglog((prev) => !prev);
  }, []);

  return (
    <div className="reactTimeLineQuality">
      <div className="iconslengend">
        <div className="iconslengendBox">
          <div>Plan Date:</div>
          <div className="k-icon k-i-circle qualityPlan"></div>
        </div>
        <div className="iconslengendBox">
          <div>Actual_date:</div>
          <div className="k-icon k-i-circle qualityAct"></div>
        </div>
      </div>
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
          toggleTrackOpen={handleToggleTrackOpen}
          enableSticky={false}
        />
      )}
      {toggleDialog && (
        <DialogComponent
          handleDialog={handleDialog}
          trackItems={trackItems}
          dialogContents={dialogContents}
          projectStartEnd={projectStartEnd}
        ></DialogComponent>
      )}
    </div>
  );
};

export default ReactTimeLineQuality;

const createTrackItems = (base_arr, engDisc_spd, index) => {
  const planItems = base_arr
    .filter((com) => com.EngDisc_spd === engDisc_spd)
    .filter((com) => com.plan_date !== null)
    .map((com, idx) => {
      return {
        id: `t-${index}-${idx}`,
        title: com.QAct,
        elements: createTrackElements(com, index, idx),
      };
    });

  return planItems;
};

const createTrackElements = (base_obj, idx1, idx2) => {
  const plan = {
    id: `t-${idx1}-${idx2}-1`,
    title: base_obj.QAct,
    start: new Date(base_obj.plan_date),
    end: new Date(
      `${base_obj.plan_date.slice(0, 10)} 23:00:00
                      `
    ),
    type: "plan",
  };

  if (base_obj.Actual_date !== null) {
    const act = {
      id: `t-${idx1}-${idx2}-2`,
      title: base_obj.QAct,
      start: new Date(base_obj.Actual_date),
      end: new Date(
        `${base_obj.Actual_date.slice(0, 10)} 23:00:00
                      `
      ),
      type: "act",
    };
    return [plan, act];
  } else {
    return [plan];
  }
};
