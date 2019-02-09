import { createElement, useRef } from "react";
import { ItemProps } from "../types/types";
import "./../styles/ItemBuilder.css";
import { emit } from "../socket";

export const ItemBuilder = () => {
    const titleRef = useRef(null);
    const ownerRef = useRef(null);
    const actionRef = useRef(null);
    const tagsRef = useRef(null);

    const formatDate = () => {
        const d = new Date();
        return `${d.getMonth()+1}/${d.getFullYear()}`;
    }

    const handleSubmit = () => {
        if (!titleRef.current || !titleRef.current.value) {
            return;
        }

        const title = titleRef.current && titleRef.current.value || ""; 
        const owner = ownerRef.current && ownerRef.current.value || "";
        const actionItem = actionRef.current && actionRef.current.value || "";
        const tags = tagsRef.current && tagsRef.current.value.split(",").map(x => x.trim()) || [];

        var obj = {
            date: formatDate(),
            actionItem,
            title,
            owner,
            tags
        };

        emit("addItem", obj);

        titleRef.current && (titleRef.current.value = "");
        ownerRef.current && (ownerRef.current.value = "");
        actionRef.current && (actionRef.current.value = "");
        tagsRef.current && (tagsRef.current.value = "");
    }

    return (
        <div className="itembuilder">
            <input type="text" placeholder="Title" ref={titleRef} />
            <input type="text" placeholder="Owner (optional)" ref={ownerRef} />
            <input type="text" placeholder="Action item (optional)" ref={actionRef} />
            <input type="text" placeholder="Tags (optional)" ref={tagsRef} />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}