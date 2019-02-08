import { createElement } from "react";
import { ItemProps } from "./../types";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import "./../styles/Item.css";

export const Item = (props: ItemProps) => {
    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="title">{props.title}</div>
            <div className="date">{props.date}</div>
            
            <Person alias={props.owner} />
            
            <div className="actionitem">{props.actionItem || "No action item(s)"}</div>

            <Rating value={props.rating || 0} />

            <div className="tags">
            { props.tags && props.tags.map((tag,i) =>
                <Tag name={tag.name} color={tag.color} key={i} /> 
            )}
            </div>
        </div>
    )
}