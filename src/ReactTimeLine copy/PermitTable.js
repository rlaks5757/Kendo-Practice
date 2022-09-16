import React, { useRef, useEffect } from "react";
import moment from "moment";

const PermitTable = ({ dialogContents }) => {
  const permitTableBody = useRef();

  useEffect(() => {
    const targetNode = permitTableBody.current.parentNode;
    targetNode.style.padding = 0;
  }, []);

  return (
    <div className="permitTable" ref={permitTableBody}>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">인허가 명</div>
        <div className="permitTableContents">{dialogContents.title}</div>
      </div>
      <div className="permitTableMergeBox">
        <div className="permitTableMergeHeader">
          <div>제출일</div>
        </div>
        <div className="permitTableHeader2">
          <div>Plan</div>
          <div>Actual</div>
        </div>
        <div className="permitTableContents2">
          <div>
            {dialogContents.PlanSubmissionDate !== null &&
              moment(dialogContents.PlanSubmissionDate).format(
                "YY년 MM월 DD일"
              )}
          </div>
          <div>
            {dialogContents.ActualSubmissionDate !== null &&
              moment(dialogContents.ActualSubmissionDate).format(
                "YY년 MM월 DD일"
              )}
          </div>
        </div>
      </div>
      <div className="permitTableMergeBox">
        <div className="permitTableMergeHeader">
          <div>취득일</div>
        </div>
        <div className="permitTableHeader2">
          <div>Plan</div>
          <div>Actual</div>
        </div>
        <div className="permitTableContents2">
          <div>
            {dialogContents.PlanObtainedDate !== null &&
              moment(dialogContents.PlanObtainedDate).format("YY년 MM월 DD일")}
          </div>
          <div>
            {dialogContents.ActualObtainedDate !== null &&
              moment(dialogContents.ActualObtainedDate).format(
                "YY년 MM월 DD일"
              )}
          </div>
        </div>
      </div>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">주관사</div>
        <div className="permitTableContents">
          {dialogContents.d_permit_lead_company}
        </div>
      </div>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">제출시기</div>
        <div className="permitTableContents">
          {dialogContents.d_permit_submit_when}
        </div>
      </div>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">처리기간</div>
        <div className="permitTableContents">
          {dialogContents.d_permit_process_due}
        </div>
      </div>
      <div className="permitTableNormalBox">
        <div className="permitTableHeader">관계기관</div>
        <div className="permitTableContents">
          {dialogContents.d_permit_related_agency}
        </div>
      </div>
    </div>
  );
};

export default PermitTable;
