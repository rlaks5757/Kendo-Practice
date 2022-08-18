import React, { useState, useEffect } from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

const VisitorsDonut = ({ data, positionData }) => {
  const [chartHeight, setChartHeight] = useState(176);

  useEffect(() => {
    setChartHeight(176 + (positionData.rowSpan - 1) * 265);
  }, [positionData]);

  return (
    <Chart
      style={{
        height: chartHeight,
      }}
    >
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={data}
          categoryField="type"
          field="value"
        />
      </ChartSeries>
      <ChartLegend position={"bottom"} visible={true} />
    </Chart>
  );
};

export default VisitorsDonut;
