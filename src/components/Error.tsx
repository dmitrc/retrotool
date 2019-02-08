import { createElement } from "react";
import { ErrorProps } from "../types";
import './../styles/Error.css';

export const Error = (props: ErrorProps) => {
    return (
        <div className="error">{props.msg}</div>
    )
}