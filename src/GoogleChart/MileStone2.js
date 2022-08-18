import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

const Milestone2 = () => {
  const [BoxHeight, setBoxHeight] = useState(250);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setBoxHeight(210 + 140 * (3 - 2));
  }, []);

  const dataarray = [
    ["MileStone", "", new Date("04-01-2022"), new Date("04-01-2022")],
    [
      "교통영향평가",
      "교평 제출 및 처리 통보",
      new Date("04-05-2022 00:00:00"),
      new Date("05-15-2022 00:00:00"),
    ],
    [
      "교통영향평가",
      "본심의",

      new Date("05-30-2022 00:00:00"),
      new Date("07-15-2022 00:00:00"),
    ],

    [
      "건축(Phase.1)",
      "건축허가",
      new Date("07-15-2022 00:00:00"),
      new Date("08-30-2022 00:00:00"),
    ],
    [
      "건축(Phase.1)",
      "건축착공신고",
      new Date("10-15-2022 00:00:00"),
      new Date("10-31-2022 00:00:00"),
    ],
    [
      "건축(Phase.1)",
      "건축사용신고",
      new Date("05-01-2023 00:00:00"),
      new Date("05-31-2023 00:00:00"),
    ],
    [
      "유해위험방지계획서",
      "공작물축조신고",
      new Date("06-15-2023 00:00:00"),
      new Date("06-24-2023 00:00:00"),
    ],
    [
      "건축(Phase.2)",
      "건축허가",
      new Date("10-15-2022 00:00:00"),
      new Date("11-30-2022 00:00:00"),
    ],
    [
      "건축(Phase.2)",
      "건축착공신고",
      new Date("01-15-2023 00:00:00"),
      new Date("01-31-2023 00:00:00"),
    ],
    [
      "건축(Phase.2)",
      "건축사용신고",
      new Date("08-01-2023 00:00:00"),
      new Date("08-31-2023 00:00:00"),
    ],
    [
      "환경인허가",
      "대기배출신고",
      new Date("06-01-2023 00:00:00"),
      new Date("06-30-2023 00:00:00"),
    ],
    [
      "환경인허가",
      "가동개시신고",
      new Date("10-31-2023 00:00:00"),
      new Date("10-31-2023 00:00:00"),
    ],
  ];

  const google = window.google;

  if (google) {
    google.charts
      .load("current", {
        packages: ["timeline"],
      })
      .then(function () {
        var container = document.getElementById("timeline");
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: "string", id: "Row" });
        dataTable.addColumn({ type: "string", id: "Bar" });
        dataTable.addColumn({ type: "date", id: "Start" });
        dataTable.addColumn({ type: "date", id: "End" });
        dataTable.addRows(dataarray);

        var dataTableGroup = google.visualization.data.group(dataTable, [0]);
        var dateRangeStart = new Date("04-01-2022");
        var dateRangeEnd = new Date("12-31-2023");
        var rowHeight = 55;
        var options = {
          height: dataTableGroup.getNumberOfRows() * rowHeight + rowHeight,
          hAxis: {
            minValue: dateRangeStart,
            maxValue: dateRangeEnd,
          },
          // timeline: { rowLabelStyle: {fontName: 'Helvetica', fontSize: 35, color: '#603913' , marginBottom:40},
          // barLabelStyle: {  paddingBottom:40 }}
        };

        function drawChart() {
          chart.draw(dataTable, options);
        }

        // add custom marker
        function addMarkers(events) {
          var baseline;
          var baselineBounds;
          var chartElements;
          var labelFound;
          var labelText;
          var marker;
          var markerLabel;
          var markerSpan;
          var rowLabel;
          var svg;
          var svgNS;
          var timeline;
          var timelineUnit;
          var timelineWidth;
          var timespan;
          var xCoord;
          var yCoord;
          var yy;

          // initialize chart elements
          baseline = null;
          svg = null;
          svgNS = null;
          timeline = null;
          chartElements = container.getElementsByTagName("svg");
          if (chartElements.length > 0) {
            svg = chartElements[0];
            svgNS = svg.namespaceURI;
          }
          chartElements = container.getElementsByTagName("rect");
          if (chartElements.length > 0) {
            timeline = chartElements[0];
          }
          chartElements = container.getElementsByTagName("path");
          if (chartElements.length > 0) {
            baseline = chartElements[0];
          }
          if (svg === null || timeline === null || baseline === null) {
            return;
          }
          timelineWidth = parseFloat(timeline.getAttribute("width"));
          baselineBounds = baseline.getBBox();
          timespan = dateRangeEnd.getTime() - dateRangeStart.getTime();
          timelineUnit = (timelineWidth - baselineBounds.x) / timespan;

          // add events
          events.forEach(function (event) {
            // find row label
            rowLabel = dataTable.getValue(event.row, 0);
            chartElements = container.getElementsByTagName("text");
            if (chartElements.length > 0) {
              Array.prototype.forEach.call(chartElements, function (label) {
                if (label.textContent.indexOf("…") > -1) {
                  labelText = label.textContent.replace("…", "");
                } else {
                  labelText = label.textContent;
                }
                if (rowLabel.indexOf(labelText) > -1) {
                  markerLabel = label.cloneNode(true);
                }
              });
            }

            // calculate placement
            markerSpan = event.date.getTime() - dateRangeStart.getTime();

            yy = parseFloat(markerLabel.getAttribute("y"));

            // add label
            markerLabel.setAttribute("text-anchor", "start");
            markerLabel.setAttribute("fill", event.color);
            markerLabel.setAttribute(
              "x",
              baselineBounds.x + timelineUnit * markerSpan + 7
            );
            markerLabel.setAttribute("y", yy + 18);
            markerLabel.setAttribute("font-size", 13);
            markerLabel.textContent = event.name;
            svg.appendChild(markerLabel);

            // add marker
            xCoord = baselineBounds.x + timelineUnit * markerSpan - 1;
            yCoord = parseFloat(markerLabel.getAttribute("y"));
            switch (event.type) {
              case "triangle":
                marker = document.createElementNS(svgNS, "polygon");
                marker.setAttribute("fill", "transparent");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "2");
                marker.setAttribute(
                  "points",
                  xCoord +
                    "," +
                    (yCoord - 10) +
                    " " +
                    (xCoord - 5) +
                    "," +
                    yCoord +
                    " " +
                    (xCoord + 5) +
                    "," +
                    yCoord
                );
                svg.appendChild(marker);
                break;

              case "circle":
                marker = document.createElementNS(svgNS, "circle");
                marker.setAttribute("cx", xCoord);
                marker.setAttribute("cy", yCoord - 5);
                marker.setAttribute("r", "6");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "3");
                marker.setAttribute("fill", event.color);
                svg.appendChild(marker);
                break;

              default:
                break;
            }
          });
        }

        function addMarkers2(events) {
          var baseline;
          var baselineBounds;
          var chartElements;
          var labelFound;
          var labelText;
          var marker;
          var markerLabel;
          var markerSpan;
          var markerSpan2;
          var rowLabel;
          var svg;
          var svgNS;
          var timeline;
          var timelineUnit;
          var timelineWidth;
          var timespan;
          var xCoord;
          var xCoord2;
          var yCoord;

          // initialize chart elements
          baseline = null;
          svg = null;
          svgNS = null;
          timeline = null;
          chartElements = container.getElementsByTagName("svg");
          if (chartElements.length > 0) {
            svg = chartElements[0];
            svgNS = svg.namespaceURI;
          }
          chartElements = container.getElementsByTagName("rect");
          if (chartElements.length > 0) {
            timeline = chartElements[0];
          }
          chartElements = container.getElementsByTagName("path");
          if (chartElements.length > 0) {
            baseline = chartElements[0];
          }
          if (svg === null || timeline === null || baseline === null) {
            return;
          }
          timelineWidth = parseFloat(timeline.getAttribute("width"));
          baselineBounds = baseline.getBBox();
          timespan = dateRangeEnd.getTime() - dateRangeStart.getTime();
          timelineUnit = (timelineWidth - baselineBounds.x) / timespan;

          // add events
          events.forEach(function (event) {
            // find row label
            rowLabel = dataTable.getValue(event.row, 0);
            chartElements = container.getElementsByTagName("text");
            if (chartElements.length > 0) {
              Array.prototype.forEach.call(chartElements, function (label) {
                if (label.textContent.indexOf("…") > -1) {
                  labelText = label.textContent.replace("…", "");
                } else {
                  labelText = label.textContent;
                }
                if (rowLabel.indexOf(labelText) > -1) {
                  markerLabel = label.cloneNode(true);
                }
              });
            }

            // calculate placement
            markerSpan = event.date.getTime() - dateRangeStart.getTime();
            markerSpan2 = event.date2.getTime() - dateRangeStart.getTime();

            // add label
            markerLabel.setAttribute("text-anchor", "start");
            markerLabel.setAttribute("fill", event.color);
            markerLabel.setAttribute(
              "x",
              baselineBounds.x + timelineUnit * markerSpan + 20
            );
            markerLabel.setAttribute("font-size", 13);
            markerLabel.textContent = event.name;
            svg.appendChild(markerLabel);

            // add marker
            xCoord = baselineBounds.x + timelineUnit * markerSpan - 1;
            xCoord2 =
              baselineBounds.x + timelineUnit * markerSpan2 - 1 - xCoord;
            yCoord = parseFloat(markerLabel.getAttribute("y"));
            switch (event.type) {
              case "line":
                marker = document.createElementNS(svgNS, "path");
                marker.setAttribute("fill", "transparent");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "1");
                marker.setAttribute("stroke-dasharray", "5 5");
                marker.setAttribute(
                  "d",
                  "M " +
                    xCoord +
                    " " +
                    (yCoord - 32) +
                    "l " +
                    xCoord2 +
                    " " +
                    55
                );
                svg.appendChild(marker);
                break;
              default:
                break;
            }
          });
        }

        // google.visualization.events.addListener(chart, "ready", function () {
        //   addMarkers2([
        //     {
        //       row: 6,
        //       date: new Date("01-10-2021 00:00:00"),
        //       date2: new Date("01-15-2021 00:00:00"),
        //       type: "line",
        //       name: "+5day",
        //       color: "#CD212A",
        //     },
        //     {
        //       row: 6,
        //       date: new Date("06-22-2021 00:00:00"),
        //       date2: new Date("07-18-2021 00:00:00"),
        //       type: "line",
        //       name:
        //         dateDiff("06-22-2021 00:00:00", "07-18-2021 00:00:00") + "days",
        //       color: "#CD212A",
        //     },
        //   ]);
        // });

        function addMarkers3(events) {
          var baseline;
          var baselineBounds;
          var chartElements;
          var labelFound;
          var labelText;
          var marker;
          var markerLabel;
          var markerSpan;

          var rowLabel;
          var svg;
          var svgNS;
          var timeline;
          var timelineUnit;
          var timelineWidth;
          var timespan;
          var xCoord;

          var yCoord;

          // initialize chart elements
          baseline = null;
          svg = null;
          svgNS = null;
          timeline = null;
          chartElements = container.getElementsByTagName("svg");
          if (chartElements.length > 0) {
            svg = chartElements[0];
            svgNS = svg.namespaceURI;
          }
          chartElements = container.getElementsByTagName("rect");
          if (chartElements.length > 0) {
            timeline = chartElements[0];
          }
          chartElements = container.getElementsByTagName("path");
          if (chartElements.length > 0) {
            baseline = chartElements[0];
          }
          if (svg === null || timeline === null || baseline === null) {
            return;
          }
          timelineWidth = parseFloat(timeline.getAttribute("width"));
          baselineBounds = baseline.getBBox();
          timespan = dateRangeEnd.getTime() - dateRangeStart.getTime();
          timelineUnit = (timelineWidth - baselineBounds.x) / timespan;

          // add events
          events.forEach(function (event) {
            // find row label
            rowLabel = dataTable.getValue(event.row, 0);
            chartElements = container.getElementsByTagName("text");
            if (chartElements.length > 0) {
              Array.prototype.forEach.call(chartElements, function (label) {
                if (label.textContent.indexOf("…") > -1) {
                  labelText = label.textContent.replace("…", "");
                } else {
                  labelText = label.textContent;
                }
                if (rowLabel.indexOf(labelText) > -1) {
                  markerLabel = label.cloneNode(true);
                }
              });
            }

            var dataTableGroup = google.visualization.data.group(dataTable, [
              0,
            ]);

            var rowHeight = 55;

            // calculate placement
            markerSpan = event.date.getTime() - dateRangeStart.getTime();

            // add label
            markerLabel.setAttribute("text-anchor", "start");
            markerLabel.setAttribute("fill", event.color);
            markerLabel.setAttribute(
              "x",
              baselineBounds.x + timelineUnit * markerSpan - 20
            );
            markerLabel.setAttribute(
              "y",
              dataTableGroup.getNumberOfRows() * rowHeight + rowHeight - 30
            );
            markerLabel.setAttribute("font-size", 13);
            markerLabel.textContent = event.name;
            svg.appendChild(markerLabel);

            // add marker
            xCoord = baselineBounds.x + timelineUnit * markerSpan - 1;

            yCoord = dataTableGroup.getNumberOfRows() * rowHeight + rowHeight;
            switch (event.type) {
              case "line":
                marker = document.createElementNS(svgNS, "path");
                marker.setAttribute("fill", "transparent");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "2");
                marker.setAttribute(
                  "d",
                  "M " + xCoord + " " + -150 + "V " + (yCoord - 50)
                );
                svg.appendChild(marker);
                break;
              default:
                break;
            }
          });
        }

        google.visualization.events.addListener(chart, "ready", function () {
          addMarkers3([
            {
              row: 0,
              date: new Date(),
              type: "line",
              name: "Today",
              color: "#000000 ",
            },
          ]);
        });

        function addMarkers4(events) {
          var baseline;
          var baselineBounds;
          var chartElements;
          var labelFound;
          var labelText;
          var marker;
          var markerLabel;
          var markerSpan;
          var rowLabel;
          var svg;
          var svgNS;
          var timeline;
          var timelineUnit;
          var timelineWidth;
          var timespan;
          var xCoord;
          var yCoord;
          var yy;

          // initialize chart elements
          baseline = null;
          svg = null;
          svgNS = null;
          timeline = null;
          chartElements = container.getElementsByTagName("svg");
          if (chartElements.length > 0) {
            svg = chartElements[0];
            svgNS = svg.namespaceURI;
          }
          chartElements = container.getElementsByTagName("rect");
          if (chartElements.length > 0) {
            timeline = chartElements[0];
          }
          chartElements = container.getElementsByTagName("path");
          if (chartElements.length > 0) {
            baseline = chartElements[0];
          }
          if (svg === null || timeline === null || baseline === null) {
            return;
          }
          timelineWidth = parseFloat(timeline.getAttribute("width"));
          baselineBounds = baseline.getBBox();
          timespan = dateRangeEnd.getTime() - dateRangeStart.getTime();
          timelineUnit = (timelineWidth - baselineBounds.x) / timespan;

          // add events
          events.forEach(function (event) {
            // find row label
            rowLabel = dataTable.getValue(event.row, 0);
            chartElements = container.getElementsByTagName("text");

            if (chartElements.length > 0) {
              Array.prototype.forEach.call(chartElements, function (label) {
                if (label.textContent.indexOf("…") > -1) {
                  labelText = label.textContent.replace("…", "");
                } else {
                  labelText = label.textContent;
                }
                if (rowLabel.indexOf(labelText) > -1) {
                  markerLabel = label.cloneNode(true);
                }
              });
            }

            markerSpan = event.date.getTime() - dateRangeStart.getTime();

            yy = parseFloat(markerLabel.getAttribute("y"));

            // add label
            markerLabel.setAttribute("text-anchor", "middle");
            markerLabel.setAttribute("fill", event.color);
            markerLabel.setAttribute("width", 13);
            markerLabel.setAttribute(
              "x",
              baselineBounds.x + timelineUnit * markerSpan
            );
            markerLabel.setAttribute(
              "y",
              event.position === "down" ? yy + 18 : yy - 15
            );
            markerLabel.setAttribute("font-size", 13);

            let chartElementschild = container.getElementsByTagName("tspan");

            markerLabel.append("tspan", event.name);

            markerLabel.textContent = event.name;

            svg.appendChild(markerLabel);

            // add marker
            xCoord = baselineBounds.x + timelineUnit * markerSpan - 1;
            yCoord = parseFloat(markerLabel.getAttribute("y"));
            switch (event.type) {
              case "triangle":
                marker = document.createElementNS(svgNS, "polygon");
                marker.setAttribute("fill", "transparent");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "2");
                marker.setAttribute(
                  "points",
                  xCoord +
                    "," +
                    (yCoord - 10) +
                    " " +
                    (xCoord - 5) +
                    "," +
                    yCoord +
                    " " +
                    (xCoord + 5) +
                    "," +
                    yCoord
                );
                svg.appendChild(marker);
                break;

              case "circle":
                marker = document.createElementNS(svgNS, "circle");
                marker.setAttribute("cx", xCoord);
                marker.setAttribute(
                  "cy",
                  event.position === "down" ? yCoord - 22 : yCoord + 11
                );
                marker.setAttribute("r", "6");
                marker.setAttribute("stroke", event.color);
                marker.setAttribute("stroke-width", "3");
                marker.setAttribute("fill", event.color);
                svg.appendChild(marker);
                break;

              default:
                break;
            }
          });
        }

        google.visualization.events.addListener(chart, "ready", function () {
          addMarkers4([
            {
              row: 0,
              date: new Date("05-02-2022"),
              name: "선착수 공문 접수",
              type: "circle",
              color: "#CD212A",
              position: "up",
            },
            {
              row: 0,
              date: new Date("05-27-2022"),
              name: "교통영향평가 접수",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
            {
              row: 0,
              date: new Date("07-25-2022"),
              name: "착공",
              type: "circle",
              color: "#CD212A",
              position: "up",
            },
            {
              row: 0,
              date: new Date("08-22-2022"),
              name: "기초",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
            {
              row: 0,
              date: new Date("09-14-2022"),
              name: "골조",
              type: "circle",
              color: "#CD212A",
              position: "up",
            },
            {
              row: 0,
              date: new Date("10-17-2022"),
              name: "MEP",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
            {
              row: 0,
              date: new Date("02-01-2023"),
              name: "E/V",
              type: "circle",
              color: "#CD212A",
              position: "up",
            },
            {
              row: 0,
              date: new Date("02-28-2023"),
              name: "생산장비 반입",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
            {
              row: 0,
              date: new Date("05-31-2023"),
              name: "준공(제2연구동)",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
            {
              row: 0,
              date: new Date("08-31-2023"),
              name: "준공(제2충방전등)",
              type: "circle",
              color: "#CD212A",
              position: "up",
            },
            {
              row: 0,
              date: new Date("11-30-2023"),
              name: "준공(Phase2)",
              type: "circle",
              color: "#CD212A",
              position: "down",
            },
          ]);
        });

        window.addEventListener("resize", drawChart, false);
        drawChart();
      });
  }

  function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
    diffDate_1 = new Date(
      diffDate_1.getFullYear(),
      diffDate_1.getMonth() + 1,
      diffDate_1.getDate()
    );
    diffDate_2 = new Date(
      diffDate_2.getFullYear(),
      diffDate_2.getMonth() + 1,
      diffDate_2.getDate()
    );
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diffDate_1 < diffDate_2 ? "+" + diff : "- " + diff;
  }
  return <div id="timeline" style={{ marginTop: (BoxHeight - 170) / 2 }}></div>;
};

export default Milestone2;
