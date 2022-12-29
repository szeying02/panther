import React from "react";
import Thread from "../types/Thread";
import { Link } from "react-router-dom";
import "./ThreadCard.css"
import { BiChat } from "react-icons/bi";
import TimeCalc from "./TimeCalc";

type ThreadCardProperties = {
    thread: Thread;
};

const ThreadCard: React.FC<ThreadCardProperties> = ({ thread }) => {
    return (
        <div className = "threadcard-container">
            <Link to = {`/forum/threads/${thread.id}`} className = "threadcard-link-container">
            <div className = "threadcard-card"> 
                    <div className = "threadcard-body">
                        <div className = "threadcard-head">
                            <div className = "threadcard-category"> #{ thread.category } </div>
                            <div className = "threadcard-username-datetime"> Posted by @{ thread.username } { TimeCalc(thread.timediff) } ago </div>
                        </div>
                        <div className = "threadcard-title"> { thread.title } </div>
                        <div className = "threadcard-content"> { thread.content } </div>
                        <div className = "threadcard-comment"> 
                            <div className = "threadcard-comment-icon"> <BiChat /> </div>
                            { thread.comments } Comments 
                        </div>
                    </div>  
                         
            </div>
            </Link> 
        </div>
    );
};

export default ThreadCard;