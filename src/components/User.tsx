import { createElement, useState, useContext } from "react";
import { EditLabel } from "./EditLabel";
import { IconButton } from "./IconButton";
import { UserContext } from "../contexts/UserContext";
import * as MdCheckmark from "react-ionicons/lib/MdCheckmark";
import * as MdCreate from "react-ionicons/lib/MdCreate";
import * as MdClose from "react-ionicons/lib/MdClose";
import "./../styles/User.css";

export const User = () => {
    const [user, setUser] = useContext(UserContext);

    const alias = (user && user.alias) || null;
    const [edit, setEdit] = useState(!alias);

    let newAlias = "";

    const handleBlur = (v: string) => {
        newAlias = v;
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSubmit = () => {
        const u = {...user} || {};
        u.alias = newAlias;

        setUser(u);
        setEdit(!newAlias);
    }

    const handleCancel = () => {
        newAlias = "";
        setEdit(false);
    }

    return (
        <div className="user">
            {!edit ? <span>Logged in as: </span> : null}
            <EditLabel edit={edit} placeholder="Your alias" onBlur={handleBlur} value={alias} className="alias" />
            {!edit ? <IconButton icon={MdCreate} onClick={handleEdit} /> : null}
            {edit ? <IconButton icon={MdCheckmark} onClick={handleSubmit} /> : null}
            {edit && user ? <IconButton icon={MdClose} onClick={handleCancel} /> : null}
        </div>
    )
}