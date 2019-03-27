import { createElement } from "react";
import { TagProps } from "../types/types";
import { Color } from "./../utils/Color";
import "./../styles/Tag.css";

const tagColors = {
    "overdue": new Color(255, 108, 0),
    "heads up": new Color(255, 108, 0),
    "discussion": new Color(0, 0, 140),
    "coming up": new Color(0, 0, 180),
    "investigation": new Color(0, 0, 160),
    "triage": new Color(0, 140, 0),
    "action item": new Color(200, 0, 0),
    "important": new Color(220, 0, 0),
    "!": new Color(220, 0, 0),
    "completed": new Color(0, 170, 0),
    "$": new Color(0, 190, 0),
    "vote": new Color(100, 0, 150),
    "dri": new Color(100, 0, 170),
    "ship": new Color(120, 0, 140),
    "documentation": new Color(120, 0, 170),
    "wow": new Color(255, 0 , 200),
    "low priority": new Color(153, 153, 153),
    "ignore": new Color(153, 153, 153),
    "draft": new Color(153, 153, 153),
    "long term": new Color(153, 153, 153),
    "follow up": new Color(0, 140, 0),
    "grassroots": new Color(0, 160, 0),
    "wisdom": new Color(255, 0 , 200),
    "work/life": new Color(255, 0 , 200),
    "morale": new Color(255, 0 , 200),
    "kudos": new Color(0, 213, 255),
    "microsoft": new Color(0, 180, 200)
}

export const Tag = (props: TagProps) => {
    if (props.value) {
        const tagId = props
            .value
            .trim()
            .toLowerCase();

        let style = null;
        const tagColor = tagColors[tagId];
        if (tagColor) {
            style = {
                background: tagColor.toCss(),
                color: tagColor.toTextCss()
            }
        }
        return (
            <div className="tag" style={style}>
                {props.value.trim()}
            </div>
        )
    }

    return null;
}