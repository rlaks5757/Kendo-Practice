import React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import PermitTable from "./PermitTable";
import MilestoneTable from "./MilestoneTable";
import "./PermitTable.scss";

const DialogComponent = ({ handleDialog, dialogContents, projectStartEnd }) => {
  return (
    <Dialog
      title={
        dialogContents.position === undefined
          ? "Permit Information"
          : "MileStone Information"
      }
      onClose={handleDialog}
      width={"30%"}
    >
      {dialogContents.position === undefined ? (
        <PermitTable dialogContents={dialogContents} />
      ) : (
        <MilestoneTable
          dialogContents={dialogContents}
          projectStartEnd={projectStartEnd}
        />
      )}
    </Dialog>
  );
};

export default DialogComponent;
