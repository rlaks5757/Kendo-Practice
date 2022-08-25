import React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import moment from "moment";

const DialogComponent = ({ handleDialog, dialogContents, projectStartEnd }) => {
  return (
    <Dialog
      title={
        dialogContents.position === undefined
          ? "Permit Information"
          : "MileStone Information"
      }
      onClose={handleDialog}
    >
      {dialogContents.position === undefined ? (
        <div>
          <p>이름: {dialogContents.title}</p>
          <p>
            시작일: {moment(new Date(dialogContents.start)).format("YY-MM-DD")}
          </p>
          <p>
            종료일: {moment(new Date(dialogContents.end)).format("YY-MM-DD")}
          </p>
          <br />
          <p>주관사: {dialogContents.d_permit_lead_company}</p>
          <p>제출시기: {dialogContents.d_permit_submit_when}</p>
          <p>처리기간: {dialogContents.d_permit_process_due}</p>
          <p>관계기관: {dialogContents.d_permit_related_agency}</p>
        </div>
      ) : (
        <div>
          <p>Project Name: {projectStartEnd.projectName}</p>
          <p>Project Duration </p>
          <p style={{ marginLeft: "15px" }}>
            Start Date:{" "}
            {moment(new Date(projectStartEnd.start)).format("YY-MM-DD")}
          </p>
          <p style={{ marginLeft: "15px" }}>
            End Date: {moment(new Date(projectStartEnd.end)).format("YY-MM-DD")}
          </p>
          <br />

          <p>MileStone Name: {dialogContents.title}</p>
          <p>
            MileStone Start Date:{" "}
            {moment(new Date(dialogContents.start)).format("YY-MM-DD")}
          </p>
        </div>
      )}
    </Dialog>
  );
};

export default DialogComponent;
