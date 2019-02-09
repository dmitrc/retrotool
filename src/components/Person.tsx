import { createElement, useState } from "react";
import { PersonProps } from "../types/types";
import "./../styles/Person.css";
import * as defaultImage from "./../images/default.png";


export const Person = (props: PersonProps) => {
    const [ src, setSrc ] = useState(`http://who/Photos/${props.alias}.jpg`);

    function handleError() {
        setSrc(defaultImage);
    }

    if (props.alias) {
        return (
            <div className="person">
                <img src={src} onError={handleError} />
                <span>{props.alias}</span>
            </div>
        )
    }
    return null;
}