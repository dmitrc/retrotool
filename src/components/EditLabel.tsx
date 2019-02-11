import { createElement, ChangeEvent, FocusEvent } from "react";
import { EditLabelProps } from "../types/types";

export const EditLabel = (props: EditLabelProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target && e.target.value;
    if (v != null) {
      v = v.trim();
      props.onUpdate && props.onUpdate(v);
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    let v = e.target && e.target.value;
    props.onBlur && props.onBlur(v || null);
  }

  if (props.edit) {
    return (
      <input type="text" defaultValue={props.value} className={props.className} placeholder={props.placeholder} onChange={handleChange} onBlur={handleBlur} ref={props.inputRef} />
    )
  }
  else if (props.value && props.customView) {
    const CustomView = props.customView;
    return (
      <CustomView value={props.value} />
    )
  }
  else if (props.value) {
    return (
      <span className={props.className}>{props.value}</span>
    )
  }

  return null;
}