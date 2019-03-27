import { createElement } from "react";
import { IconButtonProps } from "../types/types";
import "./../styles/IconButton.css";

export const IconButton = (props: IconButtonProps) => {
  var Icon = props.icon;
  var iconProps = props.options || {};
  return (
    <button className={"iconb " + (props.className || "")} onClick={props.onClick}>
      { Icon ? <Icon {...iconProps} /> : null}
      {props.text ? <span>{props.text}</span> : null}
    </button>
  )
}