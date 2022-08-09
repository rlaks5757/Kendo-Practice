import React, { useState, useEffect } from "react";
import {
  Chart,
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";

const PageViewsChart = ({ data, positionData }) => {
  const [chartHeight, setChartHeight] = useState(176);
  const dates = [];
  const views = [];

  console.log(positionData);

  data.forEach((item, i) => {
    dates.push(item.date);
    views.push(item.value);
  });

  useEffect(() => {
    setChartHeight(176 + (positionData.rowSpan - 1) * 265);
  }, [positionData]);

  return (
    <Chart
      zoomable={{
        mousewheel: {
          lock: "y",
        },
      }}
      style={{
        height: chartHeight,
      }}
    >
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          baseUnit="fit"
          type="date"
          majorTicks={{
            visible: false,
          }}
          categories={dates}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{
            step: 2,
          }}
        />
      </ChartValueAxis>
      <ChartArea background={"white"} />
      <ChartSeries>
        <ChartSeriesItem
          type="line"
          markers={{
            visible: false,
          }}
          data={views}
        />
      </ChartSeries>
    </Chart>
  );
};

export default PageViewsChart;
