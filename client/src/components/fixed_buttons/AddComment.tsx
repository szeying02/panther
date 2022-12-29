import "./AddComment.css"

interface AddCommentProperty {
    setCommentCreatePopup : Function;
}

export default function AddComment({ setCommentCreatePopup } : AddCommentProperty) {
    return (
        <div className = "addcomment-button" onClick = {() => setCommentCreatePopup(true)}>
            ADD COMMENT
        </div>
    )
}