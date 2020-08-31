import React from "react";

const Node = props => {
  let ul;
  let closed = props.hidden ? "fas fa-folder" : "fas fa-folder-open";
  let open = !props.hidden ? "open" : "closed";
  if (props.children.length) {
    ul = <ul hidden={props.hidden}>{props.children}</ul>;
  }

  return (
    <>
      <li id={props.id} className={open}>
        <i className={closed}></i>
        <span >
          {props.label}
        </span>
        {ul}
      </li>
    </>
  );
};

export default Node;
