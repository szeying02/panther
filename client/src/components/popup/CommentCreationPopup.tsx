import axios from "axios";
import { useState } from "react";
import "./Popup.css";

type CommentCreationPopupProperties = {
    open: Boolean,
    toggle: Function,
    refresh: Function,
    userid: number,
    threadid: number,
}

let backend = "http://localhost:8000/forum/comments/create"

const CommentCreationPopup : React.FC<CommentCreationPopupProperties> = ({ open, toggle, refresh, userid, threadid }) => {

    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [errorStatus, setErrorStatus] = useState(200);

    // handles changes in the comment field
    const handleComment = (e : any) => {
        setComment(e.target.value);

        if (e.target.value.length <= 0) {
            setCommentError("Comment should be more than 0 characters")
        } else {
            setCommentError("")
        }
    }

    const handleSubmit = (e :  any) => {
        e.preventDefault()

        const updatedComment = comment.replace(/'/gi, "''");

        axios.post(backend, { 
            Comment: updatedComment,
            UserID: userid,
            ThreadID: threadid
        })
        .then(res => {
            closePopup()
        }).catch((error) => {
            setErrorStatus(error.response.status)
        });
    }

    const closePopup = () => {
        refresh()
        toggle()
    }

    const allow = commentError === "" && comment !== "";

    if (open) {
        return  (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <div className = "popup-purpose"> Create a Comment</div>
                        <div className = "popup-close-button" onClick = {() => closePopup()}> x </div>
                        <div className = "popup-body">
                            <form onSubmit= { handleSubmit }>
                                <div className = "popup-section-content"> 
                                    <textarea 
                                        value = { comment } 
                                        name = "content"
                                        wrap = "soft"
                                        onChange = { handleComment } 
                                        className = "popup-textarea-content"
                                        placeholder = "Comment"
                                    />
                                    <div className = "popup-error-msg"> { commentError } </div>
                                </div>
                                <p className = "popup-section-error"> {!(errorStatus === 200 || errorStatus === 201) ? "Error 500: Internal Server Error. Close to try again.": "" } </p>
                                <button type = "submit" disabled = { !allow } className = "popup-submit-button"> Comment! </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    return null;
}

export default CommentCreationPopup;