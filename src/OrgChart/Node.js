import React, { useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const Node = ({ nodeData }) => {
  const handleNodeData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let childNodes = document.getElementById(nodeData.id).parentElement
      .childNodes;
    if (childNodes[1].className.includes("hidden")) {
      childNodes[0].className = "oc-node";
      childNodes[1].className = "";
    } else {
      childNodes[0].className = "oc-node isChildrenCollapsed";
      childNodes[1].className = "hidden";
    }
  };

  useEffect(() => {
    if (nodeData.position.includes("팀장")) {
      let childNodes = document.getElementById(nodeData.id).parentElement
        .childNodes;

      childNodes[0].className = "oc-node isChildrenCollapsed";
      childNodes[1].className = "hidden";
    }
  }, [nodeData.id, nodeData.position]);

  return (
    <div className="org-node-container">
      <div className="org-position">
        <div>{nodeData.position}</div>
      </div>
      <div className="org-person">
        <div>
          <img src={nodeData.biopic} className="headshot" alt="alt text" />
        </div>
        <div className="org-name">{nodeData.name}</div>
        {nodeData.children.length > 0 && (
          <div
            className="org-node-children"
            onClick={(e) => {
              handleNodeData(e);
            }}
          >
            {nodeData.children.length} Reportees
          </div>
        )}
      </div>

      {/* <div className="org-name">{nodeData.name}</div>

      <div className="org-title">{nodeData.designation}</div>
      <div className="org-title">TBD Field: {nodeData.tbdField}</div>
      {nodeData.children.length > 0 && (
        <div
          className="org-node-children"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            let childNodes = document.getElementById(nodeData.id).parentElement
              .childNodes;
            if (childNodes[1].className.includes("hidden")) {
              childNodes[0].className = "oc-node";
              childNodes[1].className = "";
            } else {
              childNodes[0].className = "oc-node isChildrenCollapsed";
              childNodes[1].className = "hidden";
            }
          }}
        >
          {nodeData.children.length} Reportees
        </div>
      )} */}
    </div>
  );
};

Node.propTypes = propTypes;

export default Node;
