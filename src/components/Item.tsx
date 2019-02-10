import { createElement, useState } from "react";
import { ItemProps, RatingStatus } from "../types/types";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import "./../styles/Item.css";
import { emit } from "../socket";
import { IconButton } from "./IconButton";
import * as MdCheckmark from "react-ionicons/lib/MdCheckmark";
import * as MdTrash from "react-ionicons/lib/MdTrash";
import * as MdCreate from "react-ionicons/lib/MdCreate";
import * as MdStar from "react-ionicons/lib/MdStar";
import * as MdClose from "react-ionicons/lib/MdClose";
import * as MdCheckmarkCircleOutline from "react-ionicons/lib/MdCheckmarkCircleOutline";
import { EditLabel } from "./EditLabel";

export const Item = (props: ItemProps) => {
    const [ edit, setEdit ] = useState(false);
    const editMode = edit || props.new;

    const handleChange = (status: RatingStatus, prevStatus: RatingStatus) => {
        let delta = 0;

        if (prevStatus == RatingStatus.Like) delta -= 1;
        if (prevStatus == RatingStatus.Dislike) delta += 1;
        if (status == RatingStatus.Like) delta += 1;
        if (status == RatingStatus.Dislike) delta -= 1;

        emit("rateItem", props._id, delta);
    }
    const handlePin = () => {
        if (props.pinned) {
            emit("unpinItem", props._id);
        }
        else {
            emit("pinItem", props._id);
        }
    }

    const handleComplete = () => {
        if (props.complete) {
            emit("uncompleteItem", props._id);
        }
        else {
            emit("completeItem", props._id);
        }
    }


    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = () => {
        if (edit) {
            setEdit(false);
        }
        else if (props.new) {
            //addItem();
        }
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleDelete = () => {
        emit("deleteItem", props._id);
    }

    return (
        <div className={"item " + (props.actionItem && "action") + (props.complete && "complete")}>
            <div className="c1">
                <EditLabel edit={editMode} placeholder="Date" value={props.date} className="date" />
                <Person alias={props.owner} />
                {!props.new ? <Rating value={props.rating || 0} onChange={handleChange} /> : null}
            </div>
            
            <div className="c2">  
                <EditLabel edit={editMode} placeholder="Title" value={props.title} className="title" />
                <div className="action">
                    { props.actionItem && !edit ? (
                        <span className="actionDesc">Action item: </span>
                    ): null}
                    <EditLabel edit={editMode} placeholder="Action item" value={props.actionItem} className="actionVal" />
                </div>
                { props.notes && props.notes.length > 0 ? (
                        <div className="notes">
                            <span className="notesDesc">Notes: </span>
                            <ul>{ props.notes.map((note, i) => <li className="note" key={i}>{note}</li>) }</ul>
                        </div>
                    ) : null
                }
            </div>
            
            <div className="c3">
                <div className="tags">
                    { props.tags && props.tags.length > 0 ?
                        props.tags.map((tag,i) => (
                            <Tag name={tag} key={i} /> 
                        )): null 
                    }
                </div>

                <div className="buttons">
                    {!edit && !props.new ? <IconButton icon={MdStar} onClick={handlePin} className={props.pinned ? "warning" : null} /> : null }
                    {!edit && !props.new ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}
                    {!edit && !props.new ? <IconButton icon={MdCheckmarkCircleOutline} onClick={handleComplete} className={props.complete ? "success" : null} /> : null}
                    {editMode ? <IconButton icon={MdCheckmark} onClick={handleSave} /> : null }
                    { edit && !props.new ? <IconButton icon={MdClose} onClick={handleCancel} /> : null }
                    { edit && !props.new ? <IconButton icon={MdTrash} onClick={handleDelete} /> : null }
                </div>
            </div>
        </div>
    )
}