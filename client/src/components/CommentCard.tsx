import React, { useState } from "react";
import Comment from "../types/Comment";
import axios from "axios";
import CommentUpdatePopup from "./popup/CommentUpdatePopup";
import { BiCommentEdit, BiTrash } from "react-icons/bi";
import "./CommentCard.css"
import TimeCalc from "./TimeCalc";

type CommentCardProperties = {
    comment: Comment,
    userid: number,
    setErrorStatus: Function,
    refresh: Function, 
};

const ThreadCard: React.FC<CommentCardProperties> = ({ comment, userid, setErrorStatus, refresh }) => {

    const [updatePopup, setUpdatePopup] = useState(false);

    let backend = `http://localhost:8000/forum/comments/${comment.id}`;

    const deleteComment = () => {
        axios.delete(backend)
        .then(() => {
            refresh()
        })
        .catch((error) => {
            setErrorStatus(error.response.status)
        })
    }

    const OriginalPoster = () => (
        <div className = "commentcard-original-poster">
            <div className = "commentcard-modifiable" onClick = {() => setUpdatePopup(true)}> 
                <div className = "commentcard-icon"> <BiCommentEdit /> </div>
                Edit
            </div>
            <br />
            <div className = "commentcard-modifiable" onClick = {() => deleteComment()}> 
                <div className = "commentcard-icon"> <BiTrash /> </div> 
                Delete
            </div>
        </div>
    )
        

    return (
        <div className = "commentcard-main"> 
            <div className = "commentcard-container">
                <div className = "commentcard-body">
                    <div className = "commentcard-username-datetime"> By @{ comment.username } { TimeCalc(comment.timediff) } ago </div>
                    <div className = "commentcard-comment"> { comment.comment } </div>
                    { comment.userid === userid ? <OriginalPoster /> : null }
                </div>
            </div>
            <CommentUpdatePopup open = { updatePopup } toggle = { setUpdatePopup } refresh = { refresh } comment = { comment } />
        </div>
    );
};

export default ThreadCard;