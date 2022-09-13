import React, { useState, useEffect } from "react";
import Timeline from "react-timelines";

import "react-timelines/lib/css/style.css";

import { START_YEAR, NUM_OF_YEARS, NUM_OF_TRACKS } from "./constants";

import { buildTimebar, buildTrack } from "./builders";

import { fill } from "./utils";

const now = new Date();

const timebar = buildTimebar();

const clickElement = (element) =>
  alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

const ReactTimeLine = () => {
  const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
    const track = buildTrack(i + 1);
    acc[track.id] = track;
    return acc;
  }, {});

  const [option, setOption] = useState({
    open: false,
    zoom: 2,
    // eslint-disable-next-line react/no-unused-state
    tracksById,
    tracks: Object.values(tracksById),
  });

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
    const targetTrackIdx = option.tracks.findIndex(
      (com) => com.id === track.id
    );

    option.tracks[targetTrackIdx].isOpen =
      !option.tracks[targetTrackIdx].isOpen;

    console.log(option.tracks);

    setOption((prev) => {
      return { ...prev, track: option.tracks };
    });

    // const targetOption = setOption((state) => {
    //   const tracksById = {
    //     ...state.tracksById,
    //     [track.id]: {
    //       ...track,
    //       isOpen: !track.isOpen,
    //     },
    //   };

    //   return {
    //     tracksById,
    //     tracks: Object.values(tracksById),
    //   };
    // });
  };

  const start = new Date(`${START_YEAR}`);
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`);

  return (
    <div className="app">
      <h1 className="title">React Timelines</h1>
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
        clickTrackButton={(track) => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(track));
        }}
        timebar={timebar}
        tracks={option.tracks}
        now={now}
        toggleTrackOpen={handleToggleTrackOpen}
        enableSticky
        scrollToNow
      />
    </div>
  );
};

export default ReactTimeLine;
