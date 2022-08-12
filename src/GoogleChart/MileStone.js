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
    [
      "Plan",
      "Hauling System",
      // createCustomHTMLContent("sd"),
      new Date("01-10-2021 00:00:00"),
      new Date("02-02-2021 00:00:00"),
    ],
    [
      "Plan",
      "PPWS Cable/Complaction",
      new Date("02-02-2021 00:00:00"),
      new Date("06-22-2021 00:00:00"),
    ],
    [
      "Plan",
      "Clamp & Hanger",
      new Date("06-22-2021 00:00:00"),
      new Date("07-20-2021 00:00:00"),
    ],
    [
      "Plan",
      "Deck Erection & Welding",
      new Date("07-20-2021 00:00:00"),
      new Date("12-19-2021 00:00:00"),
    ],
    [
      "Plan",
      "Pavement & others",
      new Date("12-19-2021 00:00:00"),
      new Date("01-17-2022 00:00:00"),
    ],
    [
      "Plan",
      "잔여공정/가시설 해체",
      new Date("01-17-2022 00:00:00"),
      new Date("06-17-2022 00:00:00"),
    ],
    [
      "variance",
      "",
      new Date(currentYear - 1, 0, 1),
      new Date(currentYear - 1, 0, 1),
    ],

    [
      "Actual",
      "Hauling System",
      new Date("01-15-2021 00:00:00"),
      new Date("02-02-2021 00:00:00"),
    ],
    [
      "Actual",
      "PPWS Cable/Complaction",
      new Date("02-02-2021 00:00:00"),
      new Date("07-18-2021 00:00:00"),
    ],
    [
      "Actual",
      "Clamp & Hanger",
      new Date("07-18-2021 00:00:00"),
      new Date("07-30-2021 00:00:00"),
    ],
    [
      "Actual",
      "Deck Erection & Welding",
      new Date("07-30-2021 00:00:00"),
      new Date("12-28-2021 00:00:00"),
    ],
    [
      "Actual",
      "Pavement & others",
      new Date("12-28-2021 00:00:00"),
      new Date("02-25-2022 00:00:00"),
    ],
    [
      "Actual",
      "잔여공정/가시설 해체",
      new Date("02-25-2022 00:00:00"),
      new Date("07-24-2022 00:00:00"),
    ],
  ];

  // function createCustomHTMLContent(text) {
  //   console.log(text);
  //   return `<h3>${text}</h3>`;
  // }

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
        // dataTable.addColumn({
        //   type: "string",
        //   role: "tooltip",
        //   p: { html: true },
        // });
        dataTable.addColumn({ type: "date", id: "Start" });
        dataTable.addColumn({ type: "date", id: "End" });
        dataTable.addRows(dataarray);

        var dataTableGroup = google.visualization.data.group(dataTable, [0]);
        var dateRangeStart = new Date(currentYear - 1, 0, 1);
        var dateRangeStart = new Date(currentYear - 1, 0, 1);
        var dateRangeEnd = new Date(2022, 8, 31);
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
                marker.setAttribute("fill", "transparent");
                svg.appendChild(marker);
                break;

              default:
                break;
            }
          });
        }

        google.visualization.events.addListener(chart, "ready", function () {
          addMarkers([
            {
              row: 0,
              date: new Date("04-14-2017"),
              name: "착공",
              type: "triangle",
              color: "#CD212A",
            },
            {
              row: 1,
              date: new Date("06-17-2022"),
              name: "준공",
              type: "triangle",
              color: "#CD212A",
            },
            {
              row: 1,
              date: new Date("01-17-2022"),
              name: "조기개통",
              type: "triangle",
              color: "#CD212A",
            },
            {
              row: 11,
              date: new Date("02-25-2022"),
              name: "조기개통",
              type: "triangle",
              color: "#CD212A",
            },
            {
              row: 11,
              date: new Date("07-24-2022"),
              name: "준공",
              type: "triangle",
              color: "#CD212A",
            },
          ]);
        });

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

        google.visualization.events.addListener(chart, "ready", function () {
          addMarkers2([
            {
              row: 6,
              date: new Date("01-10-2021 00:00:00"),
              date2: new Date("01-15-2021 00:00:00"),
              type: "line",
              name: "+5day",
              color: "#CD212A",
            },
            {
              row: 6,
              date: new Date("06-22-2021 00:00:00"),
              date2: new Date("07-18-2021 00:00:00"),
              type: "line",
              name:
                dateDiff("06-22-2021 00:00:00", "07-18-2021 00:00:00") + "days",
              color: "#CD212A",
            },
          ]);
        });

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
              row: 6,
              date: new Date(),
              type: "line",
              name: "Today",
              color: "#000000 ",
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
