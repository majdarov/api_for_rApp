import React from "react";
import s from "../ImpExcel.module.css";

const News = props => {
  let element;

  element = (
    <div >
      {props.name}<hr />
      {props.description}<hr />
      {props.article}
    </div>
  );

  return (
    <article className={s.article}>
      {/* {props.index}
      {rowsElements} */}
      <h3>{props.index}</h3>
      {element}
    </article>
  );
};
export default News;
