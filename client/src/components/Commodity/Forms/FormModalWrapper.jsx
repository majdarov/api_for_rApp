import React, { useLayoutEffect } from "react";
import s from './FormModalWrapper.module.css';

const FormModalWrapper = props => {

  const showForm = () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById(s['container']).style.top = 0, 0);
  }

  useLayoutEffect(showForm, []);

  return (
    <>
      <div id={s['cover-div']}></div>
      <div className={s.container} id={s['container']}>
        {props.form}
      </div>
    </>
  );
}



export default FormModalWrapper;
