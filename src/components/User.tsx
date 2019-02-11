import { createElement, useState, useContext } from "react";
import { EditLabel } from "./EditLabel";
import { IconButton } from "./IconButton";
import * as MdCheckmark from "react-ionicons/lib/MdCheckmark";
import * as MdCreate from "react-ionicons/lib/MdCreate";
import * as MdClose from "react-ionicons/lib/MdClose";
import "./../styles/User.css";
import { UserContext } from "../contexts/UserContext";

export const User = () => {
    const [user, setUser] = useContext(UserContext);
    const [edit, setEdit] = useState(!user);

    let newAlias = "";

    const handleBlur = (v: string) => {
        newAlias = v;
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSubmit = () => {
        setUser(newAlias);
        setEdit(!newAlias);
    }

    const handleCancel = () => {
        newAlias = "";
        setEdit(false);
    }

    return (
        <div className="user">
            {!edit ? <span>Logged in as: </span> : null}
            <EditLabel edit={edit} placeholder="Your alias" onBlur={handleBlur} value={user} className="alias" />
            {!edit ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}
            {edit ? <IconButton icon={MdCheckmark} onClick={handleSubmit} /> : null}
            {edit && user ? <IconButton icon={MdClose} onClick={handleCancel} /> : null}
        </div>
    )
}