import { createElement } from "react";
import { ErrorProps } from "../types/types";
import './../styles/Error.css';

export const Error = (props: ErrorProps) => {
    return (
        <div className="error">{props.text}</div>
    )
}