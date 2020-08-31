import React from "react";
import s from "./Muzik.module.css";

const Muzik = props => {

  return (
    <div>
      <div className={s.item}>{props.title}</div>
      <div className={s.container}>
        <div className={s.textdiv}>
          <textarea 
            className={s.text} 
            // cols={50}
            rows={15}
            value={props.textHTML} 
            onChange={props.onChangeText}>
            {props.textHTML}
          </textarea>
        </div>
        <div className={s.result} id="div" dangerouslySetInnerHTML={{__html: props.textHTML}}></div>
      </div>
    </div>
  );
};

export default Muzik;
