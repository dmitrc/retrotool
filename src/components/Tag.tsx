import { createElement } from "react";
import { TagProps } from "./../types";
import "./../styles/Tag.css";

export const Tag = (props: TagProps) => {
    return (
        <div className="tag" style={props.color ? {background: props.color} : {}}>
            {props.name}
        </div>
    )
}