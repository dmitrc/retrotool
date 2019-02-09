import { createElement, useState } from "react";
import { RatingProps, RatingStatus } from "../types/types";
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
        setRating(prevVal => {
            const newVal = (prevVal == RatingStatus.Like) ? RatingStatus.NotSet : RatingStatus.Like;

            props.onChange && props.onChange(newVal, prevVal);
            return newVal;
        });
    }

    const handleDown = () => {
        setRating(prevVal => {
            const newVal = (prevVal == RatingStatus.Dislike) ? RatingStatus.NotSet : RatingStatus.Dislike;

            props.onChange && props.onChange(newVal, prevVal);
            return newVal;
        });
    }

    return (
        <div className="rating">
            <IconButton icon={MdThumbsDown} className={activeDown && "danger"} onClick={handleDown} />
            <span>{value + valueDiff}</span>
            <IconButton icon={MdThumbsUp} className={activeUp && "success"} onClick={handleUp}  />
        </div>
    )
}