import axios from "axios";
import { useState } from "react";
import Comment from "../../types/Comment";

type CommentUpdatePopupProperties = {
    open: Boolean,
    toggle: Function,
    refresh: Function,
    comment: Comment,
}

const CommentUpdatePopup : React.FC<CommentUpdatePopupProperties> = ({ open, toggle, refresh, comment }) => {

    let backend = `http://localhost:8000/forum/comments/${comment.id}`;

    const [commentText, setCommentText] = useState(comment.comment);
    const [commentError, setCommentError] = useState("");
    const [errorStatus, setErrorStatus] = useState(200);

    // handles changes in the comment field
    const handleComment = (e : any) => {
        setCommentText(e.target.value);

        if (e.target.value.length <= 0) {
            setCommentError("Comment should be more than 0 characters")
        } else {
            setCommentError("")
        }
    }

    const handleSubmit = (e :  any) => {
        e.preventDefault()

        const updatedCommentText = commentText.replace(/'/gi, "''");

        axios.put(backend, { 
            ID: comment.id,
            UserID: comment.userid,
            Username: comment.username,
            Comment: updatedCommentText,
            Datetime: "",
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

    const allow = commentError === "" && commentText !== "";

    if (open) {
        return  (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <div className = "popup-purpose"> Edit Comment </div>
                        <div className = "popup-close-button" onClick = {() => closePopup()}> x </div>
                        <div className = "popup-body">
                            <form onSubmit= { handleSubmit }>
                                <div className = "popup-section-content"> 
                                    <textarea 
                                        value = { commentText } 
                                        name = "content"
                                        wrap = "soft"
                                        onChange = { handleComment } 
                                        className = "popup-textarea-content"
                                        placeholder = "Comment"
                                    />
                                    <div className = "popup-error-msg"> { commentError } </div>
                                </div>
                                <p className = "popup-section-error"> {!(errorStatus === 200 || errorStatus === 201) ? "Error 500: Internal Server Error. Close to try again.": "" } </p>
                                <button type = "submit" disabled = { !allow } className = "popup-submit-button"> Update </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }


    return null;
}

export default CommentUpdatePopup;