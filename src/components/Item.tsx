import { createElement, useState, useEffect } from "react";
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
import { EditList } from "../styles/EditList";

export const Item = (props: ItemProps) => {
    const [ edit, setEdit ] = useState(props.new ? true : false);
    let updateItem: ItemProps = props.new ? {...props} : {};

    const handleRatingUpdate = (status: RatingStatus, prevStatus: RatingStatus) => {
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
        if (updateItem.title === "" || (props.new && !updateItem.title)) {
            alert("Title is a required field");
            return;
        }
        if (updateItem.date === ""|| (props.new && !updateItem.date)) {
            alert("Date is a required field");
            return;
        }
        if (isNaN(new Date(updateItem.date).getTime())) {
            alert("Date field has the wrong format (use MMM yyyy, eg Jan 2019)");
            return;
        }

        if (edit && !props.new) {
            emit("editItem", props._id, updateItem);
            setEdit(false);
        }
        else if (props.new) {
            emit("addItem", updateItem);

            // Hacky but needed to reset the input fields for the new item
            // TODO: Find a better way to do this
            setEdit(false);
            setTimeout(() => { setEdit(true) }, 0);
        }
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleDelete = () => {
        const c = confirm("Are you sure you want to delete this item?");
        if (c) {
            emit("deleteItem", props._id);
        }
    }

    const handleTitleUpdate = (v: string) => {
        updateItem.title = v;
    }

    const handleDateUpdate = (v: string) => {
        updateItem.date = v;
    }

    const handleActionUpdate = (v: string) => {
        updateItem.actionItem = v;
    }

    const handleOwnerUpdate = (v: string) => {
        updateItem.owner = v;
    }

    const handleNotesUpdate = (v: string[]) => {
        updateItem.notes = v;
    }

    const handleTagsUpdate = (v: string[]) => {
        updateItem.tags = v;
    }

    return (
        <div className={"item " + (props.actionItem ? "action " : "") + (props.complete ? "complete " : "") + (props.pinned ? "pinned " : "")}>
            <div className="c1">
                <EditLabel edit={edit} placeholder="Date" value={props.date} className="date" onUpdate={handleDateUpdate} />
                <Person edit={edit} alias={props.owner} onUpdate={handleOwnerUpdate} />
                {!edit ? <Rating value={props.rating || 0} onUpdate={handleRatingUpdate} /> : null}
                <div className="buttons">
                    { edit && !props.new ? <IconButton icon={MdTrash} onClick={handleDelete} /> : null }
                </div>
            </div>
            
            <div className="c2">  
                <EditLabel edit={edit} placeholder="Title" value={props.title} className="title" onUpdate={handleTitleUpdate} />
                <div className="action">
                    { props.actionItem && !edit ? (
                        <span className="actionDesc">Action item: </span>
                    ): null}
                    <EditLabel edit={edit} placeholder="Action item" value={props.actionItem} className="actionVal" onUpdate={handleActionUpdate} />
                </div>

                <EditList values={props.notes} edit={edit} className="notes" itemClassName="note" title="Notes" itemPlaceholder="New note" onUpdate={handleNotesUpdate} />
            </div>
            
            <div className="c3">
                <EditList values={props.tags} edit={edit} className="tags" itemClassName="tag" itemCustomView={Tag as any} itemPlaceholder="New tag"  onUpdate={handleTagsUpdate} />

                <div className="buttons">
                    {!edit ? <IconButton icon={MdStar} onClick={handlePin} className={props.pinned ? "warning" : null} /> : null }
                    {!edit ? <IconButton icon={MdCheckmarkCircleOutline} onClick={handleComplete} className={props.complete ? "success" : null} /> : null}
                    {!edit ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}

                    {edit ? <IconButton icon={MdCheckmark} onClick={handleSave} /> : null }

                    { edit && !props.new ? <IconButton icon={MdClose} onClick={handleCancel} /> : null }
                    
                </div>
            </div>
        </div>
    )
}