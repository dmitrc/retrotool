import { createElement, useState } from "react";
import { PersonProps } from "../types/types";
import "./../styles/Person.css";
import * as defaultImage from "./../images/default.png";
import { EditLabel } from "./EditLabel";


export const Person = (props: PersonProps) => {
    const defSrc = props.edit 
        ? defaultImage 
        : `http://who/Photos/${props.alias}.jpg`;

    const [ src, setSrc ] = useState(defSrc);

    function handleError() {
        setSrc(defaultImage);
    }

    if (props.alias || props.edit) {
        return (
            <div className={"person " + (props.edit ? "edit" : null)}>
                {!props.edit ? <img src={src} onError={handleError} /> : null }
                <EditLabel edit={props.edit} value={props.alias} placeholder="Owner alias" onUpdate={props.onUpdate} />
            </div>
        )
    }
    return null;
}