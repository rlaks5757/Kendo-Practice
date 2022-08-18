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

const PopularPagesChart = ({ positionData }) => {
  const [chartHeight, setChartHeight] = useState(176);
  const pages = ["Home", "Price", "Sign-up", "Product", "Blog"];
  const visits = [
    {
      page: "Page",
      visits: [80000, 60000, 30000, 20000, 2000],
    },
  ];

  useEffect(() => {
    setChartHeight(176 + (positionData.rowSpan - 1) * 265);
  }, [positionData]);
  return (
    <Chart
      style={{
        height: chartHeight,
      }}
    >
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={pages} startAngle={45} />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          majorUnit={10000}
          max={100000}
          labels={{
            step: 5,
          }}
        />
      </ChartValueAxis>
      <ChartArea background={"white"} />
      <ChartSeries>
        {visits.map((item, i) => (
          <ChartSeriesItem key={i} type="column" data={item.visits} />
        ))}
      </ChartSeries>
    </Chart>
  );
};

export default PopularPagesChart;
