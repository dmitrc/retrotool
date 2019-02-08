import { createElement } from "react";
import { PersonProps } from "./../types";
import "./../styles/Person.css";

export const Person = (props: PersonProps) => {
    if (props.alias) {
        return (
            <div className="person">
                <img src={`http://who/Photos/${props.alias}.jpg`} />
                <span>{props.alias}</span>
            </div>
        )
    }
    return null;
}