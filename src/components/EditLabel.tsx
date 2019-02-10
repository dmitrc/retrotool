import { createElement, ChangeEvent } from "react";
import { EditLabelProps } from "../types/types";

export const EditLabel = (props: EditLabelProps) => {
  const handleChange = (e: ChangeEvent) => {
    let v = e.target && (e.target as HTMLInputElement).value;
    if (v != null) {
      v = v.trim();
      props.onUpdate && props.onUpdate(v);
    }
  }

  const handleBlur = () => {
    props.onBlur && props.onBlur();
  }

  if (props.edit) {
    return (
      <input type="text" defaultValue={props.value} className={props.className} placeholder={props.placeholder} style={{width: "100%"}} onChange={handleChange} onBlur={handleBlur} ref={props.inputRef} />
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