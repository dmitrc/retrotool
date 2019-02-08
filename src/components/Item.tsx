import { createElement } from "react";
import { ItemProps } from "./../types";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import "./../styles/Item.css";

export const Item = (props: ItemProps) => {
    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="c1">
                <div className="date">{props.date}</div>
                <Person alias={props.owner} />
                <Rating value={props.rating || 0} />
            </div>
            
            <div className="c2">  
                <div className="title">{props.title}</div>
                { props.actionItem ? (
                    <div className="action">
                        <span className="actionDesc">Action item: </span>
                        <span className="actionVal">{props.actionItem}</span>
                    </div>
                ) : null}
            </div>
            
            <div className="c3">
                <div className="tags">
                { props.tags && props.tags.map((tag,i) =>
                    <Tag name={tag.name} color={tag.color} key={i} /> 
                )}
                </div>
            
            </div>
        </div>
    )
}