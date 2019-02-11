import { createElement, useContext } from "react";
import { RatingProps } from "../types/types";
import { IconButton } from "./IconButton";
import "./../styles/Rating.css";

import * as MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import * as MdThumbsDown from "react-ionicons/lib/MdThumbsDown";
import { UserContext } from "../contexts/UserContext";

export const Rating = (props: RatingProps) => {
    const [user, setUser] = useContext(UserContext);

    const getRating = () => {
        const likes = props.likes || [];
        const dislikes = props.dislikes || [];

        return likes.length - dislikes.length;
    }

    const didLike = () => {
        const likes = props.likes || [];
        return likes.indexOf(user) > -1;
    }

    const didDislike = () => {
        const dislikes = props.dislikes || [];
        return dislikes.indexOf(user) > -1;
    }

    return (
        <div className="rating">
            <IconButton icon={MdThumbsDown} className={didDislike() ? "dislike" : null} onClick={props.onDislike} />
            <span>{getRating()}</span>
            <IconButton icon={MdThumbsUp} className={didLike() ? "like" : null} onClick={props.onLike}  />
        </div>
    )
}