import React from "react";
import { Scheduler, TimelineView } from "@progress/kendo-react-scheduler";
import {
  sampleData,
  displayDate,
  sampleDataWithCustomSchema,
  sampleDataWithResources,
} from "./events-utc";
import { Day } from "@progress/kendo-date-math";

const KendoTimeLine = () => {
  return (
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <TimelineView
        title="Hour-By-Hour"
        numberOfDays={55}
        columnWidth={100}
        slotDuration={60}
        slotDivisions={1}
        startTime={"00:00"}
        endTime={"23:00"}
        workWeekStart={Day.Sunday}
        workWeekEnd={Day.Monday}
        showWorkHours={false}
      />
    </Scheduler>
  );
};

export default KendoTimeLine;
