import React, { useState, useEffect, useRef } from "react";
import {
  Chart,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartTitle,
  ChartLegendTitle,
} from "@progress/kendo-react-charts";

import useViewPort from "../../Hooks/useViewPort";

const ConversionsChart = ({ data, positionData }) => {
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const chartRef = useRef();

  const { width } = useViewPort();

  const dates = [];
  const views = [];

  data.forEach((item, i) => {
    dates.push(item.date);
    views.push(item.value);
  });

  useEffect(() => {
    setChartHeight(176 + (positionData.rowSpan - 1) * 265);
    setChartWidth(
      width / (4 / positionData.colSpan) - (50.5 + positionData.colSpan * 3.5)
    );
  }, [positionData, width]);

  const series = [
    {
      name: "India",
      data: [
        3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.89, 8.238, 9.552, 6.855,
      ],
    },
    {
      name: "Russian Federation",
      data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3],
    },
    {
      name: "Germany",
      data: [
        0.01, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.69, 2.995,
      ],
    },
  ];
  const categories = [
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
  ];

  const SharedTooltip = (props) => {
    const { category, points } = props;

    console.log(props);

    return (
      <div>
        <div>{category}</div>
        {points.map((point, i) => (
          <div key={i}>
            {point.series.name} : {point.value}
          </div>
        ))}
      </div>
    );
  };

  const sharedTooltipRender = (context) => <SharedTooltip {...context} />;

  return (
    <Chart
      // zoomable={{
      //   mousewheel: {
      //     lock: "y",
      //   },
      // }}
      ref={chartRef}
      style={{
        height: chartHeight,
        width: chartWidth,
      }}
    >
      <ChartTooltip shared={true} render={sharedTooltipRender} />
      <ChartTitle text="Gross domestic product growth /GDP annual %/" />
      <ChartLegend position="right">
        <ChartLegendTitle text="Countries" font="18px Arial" />
      </ChartLegend>
      <ChartSeries>
        {series.map((s) => (
          <ChartSeriesItem
            name={s.name}
            data={s.data}
            type="line"
            key={s.name}
          />
        ))}
      </ChartSeries>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} />
      </ChartCategoryAxis>
    </Chart>
  );
};

export default ConversionsChart;
