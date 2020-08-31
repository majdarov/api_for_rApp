import React from 'react';
import s from './TextArea.module.css';

function TextArea(props) {
  
  let placeholder;
  let className;
  if (props.placeholder) {
    placeholder = props.placeholder;
    className = s.wrong;
  } else {
    placeholder = "add new message...";
    className = "";
  }
  
    return (
        <textarea
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          ref={props.refrence}
          wrap={"hard"}
          value={props.value}
          placeholder={placeholder}
          className={className}
          autoFocus
        />
    );
}
export default TextArea;