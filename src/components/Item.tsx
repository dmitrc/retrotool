import { createElement } from "react";
import { ItemProps, IconProps } from "./../types";
import "./../styles/Item.css";

import * as MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import * as MdThumbsDown from "react-ionicons/lib/MdThumbsDown";


export const Item = (props: ItemProps) => {
    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="title">{props.title}</div>
            <div className="date">{props.date}</div>
            <div className="owner">{props.owner || "No owner assigned"}</div>
            <div className="actionitem">{props.actionItem || "No action item(s)"}</div>
            <div className="rating">
                <button className="downvote"><MdThumbsDown color="#fff" size="20px" /></button>
                <span>{props.rating || 0}</span>
                <button className="upvote"><MdThumbsUp color="#fff" size="20px" /></button>
            </div>
            <div className="tags">
            { props.tags && props.tags.map( tag => <div className="tag" key={tag.name} style={{background: tag.color}}>{tag.name}</div> )}
            </div>
        </div>
    )
}