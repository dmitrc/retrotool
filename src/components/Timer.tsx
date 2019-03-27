import { createElement, useState, useRef } from "react";
import * as MdAlarm from 'react-ionicons/lib/MdAlarm';
import * as MdPlay from 'react-ionicons/lib/MdPlay';
import * as MdPause from 'react-ionicons/lib/MdPause';
import * as MdRefresh from 'react-ionicons/lib/MdRefresh';
import * as MdClose from 'react-ionicons/lib/MdClose';
import { IconButton } from "./IconButton";
import "../styles/Timer.css";
import { EditLabel } from "./EditLabel";
import { useInterval } from "../hooks/useInterval";

export const Timer = () => {
    const defaultDuration = "05:00";
    const inputRef = useRef(null);

    const [expanded, setExpanded] = useState(false);
    const [running, setRunning] = useState(false);
    const [ringing, setRinging] = useState(false);
    const [duration, setDuration] = useState(defaultDuration);
    const [lastDuration, setLastDuration] = useState(defaultDuration);

    useInterval(() => {
        if (running) {
            const newTime = durationToSeconds() - 1;
            if (newTime >= 0) {
                setDuration(secondsToDuration(newTime));
            }
            if (newTime == 0) {
                setRunning(false);
                setRinging(true);
                setDurationFair(lastDuration);
            }
        }
    }, 1000);

    function durationToSeconds() {
        const split = duration.split(":");

        if (split.length == 1) {
            // Seconds
            return parseInt(split[0]);
        }
        else if (split.length == 2) {
            // Minutes + seconds
            return (parseInt(split[0]) * 60) + (parseInt(split[1]));
        }
        else if (split.length == 3) {
            // Hours + minutes + seconds
            return (parseInt(split[0]) * 60 * 60) + (parseInt(split[1]) * 60) + (parseInt(split[2]));
        }
    }

    function secondsToDuration(sec) {
        if (sec < 60) {
            return `${sec}`;
        }
        else if (sec < 3600) {
            const min = Math.floor(sec / 60);
            const ssec = sec - (min * 60);
            return `${padLeft(min, 2)}:${padLeft(ssec, 2)}`;
        }

        const hrs = Math.floor(sec / 3600);
        const min = Math.floor((sec - (hrs * 3600)) / 60);
        const ssec = sec - (hrs * 3600) - (min * 60);
        return `${padLeft(hrs, 2)}:${padLeft(min, 2)}:${padLeft(ssec, 2)}`;
    }

    function padLeft(nr, n, str?){
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    }

    function setDurationFair(v) {
        setDuration(v);
        setLastDuration(v);
        if (inputRef && inputRef.current) {
            inputRef.current.value = v;
        }
    }

    function handleExpand() {
        setExpanded(true);
    }

    function handleCollapse() {
        setExpanded(false);
        setRunning(false);
        setRinging(false);
    }

    function toggleRunning() {
        setRunning(!running);
        setRinging(false);
    }

    function handleRefresh() {
        setDurationFair(lastDuration);
        setRinging(false);
    }

    function handleDuration(v: string) {
        setDurationFair(v);
    }

    if (expanded) {
        return (
            <div className={"timer " + (ringing ? "ring" : "")}>
                <EditLabel edit={!running} value={duration} onBlur={handleDuration} inputRef={inputRef} />
                <div className="btns">
                    <IconButton icon={running ? MdPause : MdPlay} onClick={toggleRunning} />
                    <IconButton icon={MdRefresh} onClick={handleRefresh} />
                    <IconButton icon={MdClose} onClick={handleCollapse} />
                </div>
            </div>
        )
    }

    return (
        <div className="timer collapsed">
            <IconButton icon={MdAlarm} onClick={handleExpand} />
        </div>
    )
}