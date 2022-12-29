import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Thread from "../../types/Thread";
import { Link, useParams } from "react-router-dom";
import ThreadUpdatePopup from "../../components/popup/ThreadUpdatePopup";
import Claims from "../../types/Claims";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import ThreadsComments from "../../components/ThreadsComments";
import CommentCreationPopup from "../../components/popup/CommentCreationPopup";
import "./IndividualThread.css"
import ForumNavBar from "../../components/ForumNavBar";
import ThreadCreationPopup from "../../components/popup/ThreadCreationPopup";
import ScrollToTop from "../../components/fixed_buttons/ScrollToTop";
import ThreadContents from "../../components/ThreadContents";
import AddComment from "../../components/fixed_buttons/AddComment";

export default function IndividualThread() {

    const { id } = useParams();
    const [thread, setThread] = useState<Thread>();
    const [claims, setClaims] = useState<Claims>();
    const [deleted, setDeleted] = useState(false);
    const [createPopup, setCreatePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [commentCreatePopup, setCommentCreatePopup] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200)

    let backend = `http://localhost:8000/forum/threads/${id}`;
    let tokenClaims = `http://localhost:8000/auth/claims`

    const fetchThread = async () => {
        try {
            const data = await axios.get(backend)
            setThread(data.data)

            const data2 = await axios.get(tokenClaims)
            setClaims(data2.data)
        } catch (error) {
            const err = error as AxiosError
            setErrorStatus(err.response!.status)
        }
        
    }

    useEffect(() => {
        fetchThread();
    }, []);

    const getThread = () => {
        axios.get(backend)
        .then((res) => {
            setThread(res.data)
        }).catch((error) => {
            setErrorStatus(error.response.status)
        })
    }

    const deleteThread = () => {
        axios.delete(backend)
        .then((res) => {
            setDeleted(true)
        })
        .catch((error) => {
            setErrorStatus(error.response.status)
        })
        
    }

    const refresh = () => {
        window.location.reload();
    }

    if (!(errorStatus === 200 || errorStatus === 201)) {
        return (
            <ErrorPage status = { errorStatus } />
        )
    }

    if (deleted) {
        return (
            <div className = "forum-main">
                <ForumNavBar setErrorStatus = { setErrorStatus } setCreatePopup = { setCreatePopup }/>
                <div className = "forum-body">
                    <div className = "forum-left side" />
                    <div className = "forum-center">
                        <div className = "indivthread-deleted"> Thread has been deleted. </div>
                        <Link to = "/forum/threads" className = "indivthread-back"> Back to forum </Link>
                    </div>
                    <div className = "forum-right side" />
                </div>
            </div>
        )
    }

    if (thread !== undefined && claims !== undefined) {
        return (
            <div className = "forum-main">
                <ForumNavBar setErrorStatus = { setErrorStatus } setCreatePopup = { setCreatePopup }/>
                <div className = "forum-body">
                    <div className = "forum-left side" />
                    <div className = "forum-center">
                        <div className = "indivthread-main">
                            <div className = "indivthread-thread">
                                <ThreadContents thread = { thread } user = { claims.username } setUpdatePopup = { setUpdatePopup } deleteThread = { deleteThread }/> 
                            </div>
                            <div className = "indivthread-comment-line"> Comments </div>
                            { Number(thread.comments) > 0 ? <ThreadsComments id = { id! } setErrorStatus = { setErrorStatus } userid = { claims.id } refresh = { refresh }/> : null }
                        </div>
                    </div>
                    <div className = "forum-right side">
                        <AddComment setCommentCreatePopup = { setCommentCreatePopup } />
                        <ScrollToTop />
                    </div>
                </div>
                <ThreadCreationPopup open = { createPopup } toggle = { setCreatePopup } refresh = { refresh } userid = { claims.id }/> 
                <ThreadUpdatePopup open = { updatePopup } toggle = { setUpdatePopup } thread = { thread } backend = { backend } getThread = { getThread } refresh = { refresh }/>
                <CommentCreationPopup open = { commentCreatePopup } toggle = { setCommentCreatePopup } refresh = { refresh } userid = { claims.id } threadid = { thread.id }/>
             </div>
        )
    }

    return (
        <Loading />
    )
}