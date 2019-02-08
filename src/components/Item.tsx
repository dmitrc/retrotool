import * as React from "react";
import "./../styles/Item.css";

export interface ItemProps {
    id: number,
    title: string,
    date: string,
    rating?: number,
    owner?: string,
    tags?: string[],
    actionItem?: string,
    complete?: boolean
};

export const Item = (props: ItemProps) => {
    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="title">{props.title}</div>
            <div className="date">{props.date}</div>
            <div className="owner">{props.owner || "No owner assigned"}</div>
            <div className="actionitem">{props.actionItem || "No action item(s)"}</div>
            <div className="rating">
                <button className="upvote">+</button>
                <span>{props.rating || 0}</span>
                <button className="downvote">-</button>
            </div>
            <div className="tags">
            { props.tags && props.tags.map( tag => <div className="tag" key={tag}>{tag}</div> )}
            </div>
        </div>
    )
}