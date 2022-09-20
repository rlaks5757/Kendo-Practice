import React, { useRef, useEffect } from "react";
import moment from "moment";

const MilestoneTable = ({ dialogContents, projectStartEnd, toggleDialog }) => {
  const permitTableBody = useRef();

  useEffect(() => {
    const targetNode = permitTableBody.current.parentNode;
    targetNode.style.padding = 0;
  }, []);

  useEffect(() => {
    if (toggleDialog) {
      const dialogHeaderNode =
        permitTableBody.current.parentNode.previousSibling;

      const addHeaderClassName = " permitMilestoneTableHeader";

      dialogHeaderNode.className =
        dialogHeaderNode.className + addHeaderClassName;
    }
  }, [toggleDialog]);

  return (
    <div className="permitTable" ref={permitTableBody}>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">Project Name</div>
        <div className="permitTableContents">{projectStartEnd.projectName}</div>
      </div>
      <div className="permitTableMergeBox">
        <div className="permitTableMergeHeader">
          <div style={{ wordBreak: "keep-all" }}>Project Duration</div>
        </div>
        <div className="permitTableHeader2">
          <div>Start</div>
          <div>End</div>
        </div>
        <div className="permitTableContents2">
          <div>
            {moment(new Date(projectStartEnd.start)).format("YY년 MM월 DD일")}
          </div>
          <div>
            {moment(new Date(projectStartEnd.end)).format("YY년 MM월 DD일")}
          </div>
        </div>
      </div>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">
          <div style={{ wordBreak: "keep-all" }}>MileStone Name</div>
        </div>
        <div className="permitTableContents">{dialogContents.title}</div>
      </div>
      <div className="permitTableMergeBox">
        <div className="permitTableMergeHeader">
          <div>MileStone</div>
        </div>
        <div className="permitTableHeader2">
          <div>Plan</div>
          <div>Actual</div>
        </div>
        <div className="permitTableContents2">
          <div>
            {dialogContents.plan_date !== null &&
              moment(new Date(dialogContents.plan_date)).format(
                "YY년 MM월 DD일"
              )}
          </div>
          <div>
            {dialogContents.genActualDate !== null &&
              moment(new Date(dialogContents.genActualDate)).format(
                "YY년 MM월 DD일"
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTable;
