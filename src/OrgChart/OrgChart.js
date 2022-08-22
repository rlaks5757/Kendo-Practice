import React from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import Node from "./Node";
import "./OrgChart.css";

const OrgChart = () => {
  const ds = {
    id: 1,
    name: "이우영",
    position: "현장소장",
    biopic:
      "https://ruralinnovation.us/wp-content/uploads/2021/09/Stephanie-Tomlin-1094x1094.jpeg",
    children: [
      {
        id: 2,
        name: "김지현",
        position: "공무팀장",
        biopic:
          "https://ruralinnovation.us/wp-content/uploads/2021/03/MacDermot_Dolley-Headshot-1094x1094.jpg",
        children: [
          {
            id: 3,
            name: "송동현",
            position: "공무담당",
            biopic:
              "https://ruralinnovation.us/wp-content/uploads/2021/03/MacDermot_Dolley-Headshot-1094x1094.jpg",
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: "오찬일",
        position: "전기팀장",
        biopic:
          "https://ruralinnovation.us/wp-content/uploads/2021/07/Matt-Rogers-1094x1094.jpg",
        children: [
          {
            id: 6,
            name: "TBD",
            position: "전기담당",
            children: [],
          },
          {
            id: 7,
            name: "TBD",
            position: "전기담당",
            children: [],
          },
          {
            id: 8,
            name: "TBD",
            position: "전기담당",
            children: [],
          },
          {
            id: 9,
            name: "TBD",
            position: "전기담당",
            children: [],
          },
        ],
      },
      {
        id: 10,
        name: "손교식",
        position: "토건팀장",
        biopic:
          "https://ruralinnovation.us/wp-content/uploads/2021/03/Alex-Tenenbaum-1094x1094.jpeg",
        children: [
          {
            id: 11,
            name: "TBD",
            position: "토건담당",
            children: [],
          },
          {
            id: 12,
            name: "TBD",
            position: "토건담당",
            children: [],
          },
          {
            id: 13,
            name: "TBD",
            position: "토건담당",
            children: [],
          },
        ],
      },
      {
        id: 14,
        name: "TBD",
        position: "품질코디",
        children: [
          {
            id: 15,
            name: "TBD",
            position: "품질담당",
            children: [],
          },
        ],
      },
      {
        id: 16,
        name: "TBD",
        position: "안전팀장",
        children: [
          {
            id: 17,
            name: "TBD",
            position: "안전관리자",
            children: [],
          },
          {
            id: 18,
            name: "TBD",
            position: "안전관리자",
            children: [],
          },
          {
            id: 19,
            name: "TBD",
            position: "안전관리자",
            children: [],
          },
          {
            id: 20,
            name: "TBD",
            position: "보건관리자",
            children: [],
          },
        ],
      },
    ],
  };

  return (
    <OrganizationChart
      datasource={ds}
      chartClass="sekure-org-chart"
      NodeTemplate={Node}
      pan={true}
      zoom={true}
    />
  );
};

export default OrgChart;
