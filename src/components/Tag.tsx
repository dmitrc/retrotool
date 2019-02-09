import { createElement } from "react";
import { TagProps } from "../types/types";
import "./../styles/Tag.css";

export const Tag = (props: TagProps) => {
    return (
        <div className="tag">
            {props.name}
        </div>
    )
}