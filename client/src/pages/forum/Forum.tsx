import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import ThreadCreationPopup from "../../components/popup/ThreadCreationPopup";
import ForumThreads from "../../components/ForumThreads"
import Claims from "../../types/Claims";
import Loading from "../Loading";
import "./Forum.css";
import ScrollToTop from "../../components/fixed_buttons/ScrollToTop";
import ForumNavBar from "../../components/ForumNavBar";

export default function Forum() {

    document.body.style.overflow = 'auto';

    let tokenClaims = `http://localhost:8000/auth/claims`;
    let allThreadsBackend = "http://localhost:8000/forum/threads"

    const [createPopup, setCreatePopup] = useState(false);
    const [claims, setClaims] = useState<Claims>();
    const [errorStatus, setErrorStatus] = useState(200);
    
    const fetchClaims = async () => {
        try {
            const data = await axios.get(tokenClaims)
            setClaims(data.data)
        } catch (error) {
            const err = error as AxiosError
            setErrorStatus(err.response!.status)
        }
    }

    useEffect(() => {
        fetchClaims();
    }, []);
    

    const refresh = () => {
        window.location.reload();
    }

    if (!(errorStatus === 200 || errorStatus === 201)) {
        return (
            <ErrorPage status = { errorStatus } />
        )
    }

    if (claims !== undefined) {
        return (
            <div className = "forum-main">
                <ForumNavBar setErrorStatus = { setErrorStatus } setCreatePopup = { setCreatePopup } />
                <div className = "forum-body">
                    <div className = "forum-left side" />
                    <div className = "forum-center">
                        <ForumThreads backend = { allThreadsBackend } setErrorStatus = { setErrorStatus }/>
                    </div>
                    <div className = "forum-right side">
                        <ScrollToTop />
                    </div>
                </div>
                <ThreadCreationPopup open = { createPopup } toggle = { setCreatePopup } refresh = { refresh } userid = { claims.id }/>
            </div>
        );
    }
    
    return (
        <Loading />
    )

}