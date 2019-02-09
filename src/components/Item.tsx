import { createElement } from "react";
import { ItemProps, RatingStatus } from "../types/types";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import "./../styles/Item.css";
import { emit } from "../socket";

export const Item = (props: ItemProps) => {
    const handleChange = (status: RatingStatus, prevStatus: RatingStatus) => {
        let delta = 0;

        if (prevStatus == RatingStatus.Like) delta -= 1;
        if (prevStatus == RatingStatus.Dislike) delta += 1;
        if (status == RatingStatus.Like) delta += 1;
        if (status == RatingStatus.Dislike) delta -= 1;

        emit("rateItem", props._id, delta);
    }

    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="c1">
                <div className="date">{props.date}</div>
                <Person alias={props.owner} />
                <Rating value={props.rating || 0} onChange={handleChange} />
            </div>
            
            <div className="c2">  
                <div className="title">{props.title}</div>
                { props.actionItem ? (
                    <div className="action">
                        <span className="actionDesc">Action item: </span>
                        <span className="actionVal">{props.actionItem}</span>
                    </div>
                ) : null}
                { props.notes && props.notes.length > 0 ? (
                        <div className="notes">
                            <span className="notesDesc">Notes: </span>
                            <ul>{ props.notes.map((note, i) => <li className="note" key={i}>{note}</li>) }</ul>
                        </div>
                    ) : null
                }
            </div>
            
            <div className="c3">
                { props.tags && props.tags.length > 0 ? (
                    <div className="tags">
                        {props.tags.map((tag,i) =>
                            <Tag name={tag} key={i} /> 
                        )}
                    </div>
                ): null }
            
            </div>
        </div>
    )
}