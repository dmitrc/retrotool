import { createElement, useRef } from "react";

export interface EditLabelProps {
  value?: string,
  placeholder?: string,
  edit?: boolean,
  className?: string
}

export const EditLabel = (props: EditLabelProps) => {
  const inputRef = useRef(null);

  if (props.edit) {
    return (
      <input type="text" ref={inputRef} defaultValue={props.value} className={props.className} placeholder={props.placeholder} style={{width: "100%"}}/>
    )
  }
  else if (props.value) {
    return (
      <span className={props.className}>{props.value}</span>
    )
  }

  return null;
}