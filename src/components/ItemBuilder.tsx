import * as React from "react";
import { ItemProps } from "./Item";
import "./../styles/ItemBuilder.css";

export interface ItemBuilderProps {
    handleAdd?: (item: ItemProps) => void
}

export const ItemBuilder = (props: ItemBuilderProps) => {
    var handleSubmit = () => {
        props.handleAdd && props.handleAdd({
            id: 1,
            title: "Demo",
            date: "Jan 2019"
        });
    }

    return (
        <div className="itembuilder">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Owner (optional)" />
            <input type="text" placeholder="Tags (optional)" />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}