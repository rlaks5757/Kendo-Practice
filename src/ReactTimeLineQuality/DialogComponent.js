import React, { useEffect, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import moment from "moment";

const DialogComponent = ({
  handleDialog,
  dialogContents,
  projectStartEnd,
  trackItems,
}) => {
  const [dialogContent, setDialogContent] = useState({});

  useEffect(() => {
    const split_id = dialogContents.id.split("-");

    const filterTrackItems = trackItems.filter((com) =>
      com.id.includes(`${split_id[0]}-${split_id[1]}-${split_id[2]}`)
    );

    const planTrackItem = trackItems.find(
      (com) => (com.id = `${split_id[0]}-${split_id[1]}-${split_id[2]}-1`)
    );

    const actTrackItem = trackItems.find(
      (com) => (com.id = `${split_id[0]}-${split_id[1]}-${split_id[2]}-2`)
    );

    if (filterTrackItems.lenght > 1) {
      setDialogContent({
        title: filterTrackItems[0].title,
        plan_date: moment(new Date(planTrackItem.start)).format(
          "YY년 MM월 DD일"
        ),
        act_date: moment(new Date(actTrackItem.start)).format("YY년 MM월 DD일"),
      });
    } else {
      setDialogContent({
        title: filterTrackItems[0].title,
        plan_date: moment(new Date(planTrackItem.start)).format(
          "YY년 MM월 DD일"
        ),
        act_date: "-",
      });
    }
  }, [dialogContents, trackItems]);

  return (
    <Dialog title={"Quality Critical Process"} onClose={handleDialog}>
      <div>
        <p>Title: {dialogContents.title}</p>
        <p>Plan Date: {dialogContent.plan_date}</p>
        <p>Actual Date: {dialogContent.act_date}</p>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
