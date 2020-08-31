import React from "react";
import News from "./News/News";
import s from "./ImpExcel.module.css";
import readXlsxFile from "read-excel-file";
import { useState } from "react";

const ImpExcel = props => {

  const [childElements, setChildElements] = useState([]);

  let elements = [];

  const inpChange = (e) => {
    readXlsxFile(e.target.files[0]).then(rows => {
      rows.forEach((item, idx) => {
        if (!idx) return;
        const element = <News
          index={item[3]}
          key={item[0]}
          name={item[1]}
          description={item[8]}
          article={item[9]} />;
        elements.push(element);
      });
    }).then(() => {
      setChildElements(elements)
    })
  }

  return (
    <div className={s.page}>
      <input type="file" id="input" onChange={(e) => inpChange(e)} />
      <h1>LATEST NEWS</h1>
      <div className={s.archive}>{childElements}</div>
    </div>
  );
};

export default ImpExcel;
