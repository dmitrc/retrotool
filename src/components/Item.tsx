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
import { EditList } from "../styles/EditList";

export const Item = (props: ItemProps) => {
    const [ edit, setEdit ] = useState(false);
    const editMode = edit || props.new;
    let updateItem: ItemProps = {};

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
        if (edit) {
            emit("editItem", props._id, updateItem);
            updateItem = {};
            setEdit(false);
        }
        else if (props.new) {
            emit("addItem", updateItem);
            updateItem = {};
        }
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleDelete = () => {
        emit("deleteItem", props._id);
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
        <div className={"item " + (props.actionItem ? "action " : "") + (props.complete ? "complete " : "")}>
            <div className="c1">
                <EditLabel edit={editMode} placeholder="Date" value={props.date} className="date" onUpdate={handleDateUpdate} />
                {!editMode ? <Rating value={props.rating || 0} onUpdate={handleRatingUpdate} /> : null}
                <Person edit={editMode} alias={props.owner} onUpdate={handleOwnerUpdate} />
                <div className="buttons">
                    { edit && !props.new ? <IconButton icon={MdTrash} onClick={handleDelete} /> : null }
                </div>
            </div>
            
            <div className="c2">  
                <EditLabel edit={editMode} placeholder="Title" value={props.title} className="title" onUpdate={handleTitleUpdate} />
                <div className="action">
                    { props.actionItem && !edit ? (
                        <span className="actionDesc">Action item: </span>
                    ): null}
                    <EditLabel edit={editMode} placeholder="Action item" value={props.actionItem} className="actionVal" onUpdate={handleActionUpdate} />
                </div>

                <EditList values={props.notes} edit={editMode} className="notes" itemClassName="note" title="Notes" itemPlaceholder="New note" onUpdate={handleNotesUpdate} />
            </div>
            
            <div className="c3">
                <EditList values={props.tags} edit={editMode} className="tags" itemClassName="tag" title="Tags" itemCustomView={Tag as any} itemPlaceholder="New tag"  onUpdate={handleTagsUpdate} />

                <div className="buttons">
                    {!editMode ? <IconButton icon={MdStar} onClick={handlePin} className={props.pinned ? "warning" : null} /> : null }
                    {!editMode ? <IconButton icon={MdCheckmarkCircleOutline} onClick={handleComplete} className={props.complete ? "success" : null} /> : null}
                    {!editMode ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}

                    {editMode ? <IconButton icon={MdCheckmark} onClick={handleSave} /> : null }

                    { edit && !props.new ? <IconButton icon={MdClose} onClick={handleCancel} /> : null }
                    
                </div>
            </div>
        </div>
    )
}