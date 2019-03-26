import { createElement, useState } from 'react';
import { IconButton } from "./IconButton";
import * as MdRefresh from 'react-ionicons/lib/MdRefresh';
import * as MdClose from 'react-ionicons/lib/MdClose';
import { RefreshDataProps } from '../types/types';
import '../styles/RefreshData.css';

export const RefreshData = (props: RefreshDataProps) => {
    const [show, setShow] = useState(true);

    function handleDismiss() {
        setShow(false);
    }

    return (
        <div className="refresh" style={{display: show ? "block" : "none"}}>
            <div className="desc">
                Updates to the feed are available!
            </div>
            <div className="btns">
                <IconButton icon={MdRefresh} onClick={props.onClick} text="Refresh" />
                <IconButton icon={MdClose} onClick={handleDismiss} text="Dismiss" />
            </div>
        </div>
    )
}