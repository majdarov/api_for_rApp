import React from "react";
import s from './Form.module.css';

const FormImg = ({photo}) => {

  return (
    <>
      <img className={s['big-img']}
        src={photo}
        alt="no" tabIndex='-1'
        style={{display: 'inline-block', height: '60vh',
               position: 'fixed', top: '10vh', left: '30vw',
               verticalAlign: 'middle'}}
      /><span></span>
    </>
  );
}

export default FormImg;
