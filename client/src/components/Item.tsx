import { createElement, useState, useContext, useEffect } from "react";
import { ItemProps } from "../types/types";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Tag } from "./Tag";
import { emit } from "../utils/Socket";
import { IconButton } from "./IconButton";
import { EditLabel } from "./EditLabel";
import { EditList } from "./EditList";
import { UserContext } from "../contexts/UserContext";
import { isValidDate } from "../utils/Date";
import * as MdCheckmark from "react-ionicons/lib/MdCheckmark";
import * as MdTrash from "react-ionicons/lib/MdTrash";
import * as MdCreate from "react-ionicons/lib/MdCreate";
import * as MdStar from "react-ionicons/lib/MdStar";
import * as MdClose from "react-ionicons/lib/MdClose";
import * as MdCheckmarkCircleOutline from "react-ionicons/lib/MdCheckmarkCircleOutline";
import "./../styles/Item.css";

export const Item = (props: ItemProps) => {
    const [ edit, setEdit ] = useState(props.new ? true : false);
    const [ user, setUser ] = useContext(UserContext);
    const [ updateItem, setUpdateItem ] = useState(props.new ? {...props} : {});

    const handlePin = () => {
        if (props.pinned) {
            emit("unpinItem", props._id);
        }
        else {
            emit("pinItem", props._id);
        }
    }

    const handleLike = () => {
        if (user && user.alias) {
            emit("likeItem", props._id, user.alias);
        }
        else {
            alert("Please input your alias on the top of the page to like items");
        }
    }

    const handleDislike = () => {
        if (user && user.alias) {
            emit("dislikeItem", props._id, user.alias);
        }
        else {
            alert("Please input your alias on the top of the page to dislike items");
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
        if (updateItem.date && !isValidDate(updateItem.date)) {
            alert("Date is specified in incorrect format (eg Jan 2019)");
            return;
        }

        if (edit && !props.new) {
            emit("editItem", props._id, updateItem);
            setEdit(false);
            setUpdateItem({});
        }
        else if (props.new) {
            emit("addItem", updateItem);

            // Hacky but needed in order to reset the input fields for the new item
            setEdit(false);
            setUpdateItem({...props});
            setTimeout(() => { setEdit(true) }, 0);
        }
    }

    const handleCancel = () => {
        setEdit(false);
        setUpdateItem({});
    }

    const handleDelete = () => {
        const c = confirm("Are you sure you want to delete this item?");
        if (c) {
            emit("deleteItem", props._id);
        }
    }

    const handleTitleUpdate = (v: string) => {
        const u = {...updateItem};
        u.title = v;
        setUpdateItem(u);
    }

    const handleDateUpdate = (v: string) => {
        const u = {...updateItem};
        u.date = v;
        setUpdateItem(u);
    }

    const handleActionUpdate = (v: string) => {
        const u = {...updateItem};
        u.actionItem = v;
        setUpdateItem(u);
    }

    const handleOwnerUpdate = (v: string) => {
        const u = {...updateItem};
        u.owner = v;
        setUpdateItem(u);
    }

    const handleNotesUpdate = (v: string[]) => {
        const u = {...updateItem};
        u.notes = v;
        setUpdateItem(u);
    }

    const handleTagsUpdate = (v: string[]) => {
        const u = {...updateItem};
        u.tags = (v && v.map(s => s.toLowerCase())) || null;
        setUpdateItem(u);
    }

    const ownItem = user && user.alias && props.owner && user.alias == props.owner;
    return (
        <div className={"item " + (props.actionItem ? "action " : "") + (props.complete ? "complete " : "") + (props.pinned ? "pinned " : "") + (ownItem ? "own " : "")}>
            <div className="c1">
                <EditLabel edit={edit} placeholder="Date" value={props.date} className="date" onBlur={handleDateUpdate} />
                <Person edit={edit} alias={props.owner} onBlur={handleOwnerUpdate} />
                <div className="spacer" />
                {!edit ? <Rating onLike={handleLike} onDislike={handleDislike} likes={props.likes} dislikes={props.dislikes} /> : null}
                <div className="buttons">
                    { edit && !props.new ? <IconButton icon={MdTrash} onClick={handleDelete} /> : null }
                </div>
            </div>
            
            <div className="c2">  
                <EditLabel edit={edit} placeholder="Title" value={props.title} className="title" onBlur={handleTitleUpdate} />
                <div className="action">
                    { props.actionItem && !edit ? (
                        <span className="actionDesc">Action item: </span>
                    ): null}
                    <EditLabel edit={edit} placeholder="Action item" value={props.actionItem} className="actionVal" onBlur={handleActionUpdate} />
                </div>

                <EditList values={props.notes} edit={edit} className="notes" itemClassName="note" title="Notes" itemPlaceholder="New note" onUpdate={handleNotesUpdate} />
            </div>
            
            <div className="c3">
                <EditList values={props.tags} edit={edit} className="tags" itemClassName="tag" itemCustomView={Tag as any} itemPlaceholder="New tag" onUpdate={handleTagsUpdate} />

                <div className="buttons">
                    {!edit ? <IconButton icon={MdStar} onClick={handlePin} className="pin" /> : null }
                    {!edit ? <IconButton icon={MdCheckmarkCircleOutline} onClick={handleComplete} className="complete" /> : null}
                    {!edit ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}

                    {edit ? <IconButton icon={MdCheckmark} onClick={handleSave} /> : null }

                    { edit && !props.new ? <IconButton icon={MdClose} onClick={handleCancel} /> : null }
                    
                </div>
            </div>
        </div>
    )
}