import { createElement, useContext } from "react";
import { RatingProps } from "../types/types";
import { IconButton } from "./IconButton";
import { UserContext } from "../contexts/UserContext";
import * as MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import * as MdThumbsDown from "react-ionicons/lib/MdThumbsDown";
import "./../styles/Rating.css";

export const Rating = (props: RatingProps) => {
    const [user, setUser] = useContext(UserContext);

    const getRating = () => {
        const likes = props.likes || [];
        return likes.length;
    }

    const didLike = () => {
        const likes = props.likes || [];
        const alias = user && user.alias;

        if (alias) {
            return likes.indexOf(alias) > -1;
        }

        return false;
    }

    return (
        <div className="rating">
            <IconButton icon={MdThumbsUp} className={didLike() ? "like" : null} onClick={props.onLike}  />
            <span>{getRating()}</span>
        </div>
    )
}