import Comment from "../types/Comment"
import CommentCard from "./CommentCard";

type CommentsListProperties = {
    comments: Comment[],
    userid: number,
    setErrorStatus: Function,
    refresh: Function, 
}

const CommentsList : React.FC<CommentsListProperties> = ({ comments, userid, setErrorStatus, refresh }) => {
    return (
        <ul>
            {comments
                .map(comment => 
                    <CommentCard comment = { comment } userid = { userid } setErrorStatus = { setErrorStatus } refresh = { refresh }/>
                )
            }
        </ul>
    )
}

export default CommentsList;