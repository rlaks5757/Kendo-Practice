import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const UsersChart = ({ data, positionData }) => {
  const [chartHeight, setChartHeight] = useState(176);

  useEffect(() => {
    setChartHeight(176 + (positionData.rowSpan - 1) * 265);
  }, [positionData]);

  return (
    <Grid
      style={{
        height: chartHeight,
      }}
      data={data}
      scrollable={"scrollable"}
    >
      <Column field="channel" title="Channel" />
      <Column field="conversion" title="Number Of Conversion" />
      <Column field="users" title="Number Of Users" />
    </Grid>
  );
};

export default UsersChart;
