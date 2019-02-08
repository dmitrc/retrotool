import { createElement, useState } from "react";
import { RatingProps, RatingStatus } from "./../types";
import { IconButton } from "./IconButton";
import "./../styles/Rating.css";

import * as MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import * as MdThumbsDown from "react-ionicons/lib/MdThumbsDown";

export const Rating = (props: RatingProps) => {
    const [rating, setRating] = useState(RatingStatus.NotSet);
    const value = props.value || 0;

    const activeUp = rating == RatingStatus.Like;
    const activeDown = rating == RatingStatus.Dislike;
    const valueDiff = activeUp ? 1 : (activeDown ? -1 : 0);

    const handleUp = () => {
        const newVal = activeUp ? RatingStatus.NotSet : RatingStatus.Like;
        setRating(newVal);
        props.onChange && props.onChange(newVal);
    }

    const handleDown = () => {
        const newVal = activeDown ? RatingStatus.NotSet : RatingStatus.Dislike;
        setRating(newVal);
        props.onChange && props.onChange(newVal);
    }

    return (
        <div className="rating">
            <IconButton icon={MdThumbsDown} className={activeDown && "danger"} onClick={handleDown} />
            <span>{value + valueDiff}</span>
            <IconButton icon={MdThumbsUp} className={activeUp && "success"} onClick={handleUp}  />
        </div>
    )
}