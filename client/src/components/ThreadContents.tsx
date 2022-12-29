import { BiChat, BiEditAlt, BiTrash } from "react-icons/bi";
import Thread from "../types/Thread";
import "./ThreadContents.css"
import TimeCalc from "./TimeCalc";

interface ThreadContentsProperties {
    thread: Thread;
    user: string;
    setUpdatePopup: Function;
    deleteThread: Function;
}

export default function ThreadContents({ thread, user, setUpdatePopup, deleteThread } : ThreadContentsProperties) {

    const OriginalPoster = () => (
        <div className = "threadcontents-original-poster">
            <div className = "threadcontents-modifiable" onClick = {() => setUpdatePopup(true)}>
                <div className = "threadcontents-icon"> <BiEditAlt /> </div>
                Edit
            </div>
            <div className = "threadcontents-modifiable" onClick = {() => deleteThread()}>
                <div className = "threadcontents-icon"> <BiTrash /> </div> 
                    Delete
            </div>
        </div>
    )

    return (
        <div className = "threadcontents-main">
            <div className = "threadcontents-container"> 
                <div className = "threadcontents-body">
                    <div className = "threadcontents-head">
                        <div className = "threadcontents-category"> #{ thread.category } </div>
                        <div className = "threadcontents-username-datetime"> Posted by @{ thread.username } { TimeCalc(thread.timediff) } ago </div>
                    </div>
                    <div className = "threadcontents-title"> { thread.title } </div>
                    <div className = "threadcontents-content"> { thread.content } </div>
                    <div className = "threadcontents-footer">
                        <div className = "threadcontents-comment"> 
                            <div className = "threadcontents-icon"> <BiChat /> </div>
                            { thread.comments } Comments
                        </div>
                        { thread.username === user ? <OriginalPoster /> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}