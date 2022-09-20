import React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import PermitTable from "./PermitTable";
import MilestoneTable from "./MilestoneTable";
import "./PermitTable.scss";

const DialogComponent = ({
  handleDialog,
  dialogContents,
  projectStartEnd,
  toggleDialog,
}) => {
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
        <PermitTable
          dialogContents={dialogContents}
          toggleDialog={toggleDialog}
        />
      ) : (
        <MilestoneTable
          dialogContents={dialogContents}
          projectStartEnd={projectStartEnd}
          toggleDialog={toggleDialog}
        />
      )}
    </Dialog>
  );
};

export default DialogComponent;
