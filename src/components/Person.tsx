import { createElement } from "react";
import { PersonProps } from "./../types";
import "./../styles/Person.css";

export const Person = (props: PersonProps) => {
    const fallback = props.fallback || "No owner assigned";
    return (
        <div className="person">
            {props.alias ? <img src={`http://who/Photos/${props.alias}.jpg`} /> : null}
            {props.alias || fallback}
        </div>
    )
}