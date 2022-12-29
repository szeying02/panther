import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import SearchThreads from "../../components/SearchThreads";
import ThreadSearchPopup from "../../components/popup/ThreadSearchPopup";
import ForumNavBar from "../../components/ForumNavBar";
import ThreadCreationPopup from "../../components/popup/ThreadCreationPopup";
import axios, { AxiosError } from "axios";
import Claims from "../../types/Claims";
import Loading from "../Loading";
import ScrollToTop from "../../components/fixed_buttons/ScrollToTop";
import "./Search.css"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"

export default function Search() {

    let tokenClaims = `http://localhost:8000/auth/claims`;

    const [searchPopup, setSearchPopup] = useState(false);
    const [createPopup, setCreatePopup] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200);
    const [category, setCategory] = useState("None");
    const [search, setSearch] = useState("");
    const [claims, setClaims] = useState<Claims>();

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

    const EmptySearch = () => (
        <div className = "search-empty">
            <div className = "search-empty-text"> Key in your Search Parameters to get started. </div>
        </div>
    )

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
                        <div className = "search-header">
                            <div className = "search-results"> Search Results </div>
                            <div className = "search-parameters" onClick = {() => setSearchPopup(true)}>
                                <div className = "search-parameters-icon"> <HiOutlineAdjustmentsHorizontal /> </div>
                                Search Parameters
                            </div>
                        </div>
                        { category === "None" && search === "" ? <EmptySearch /> : <SearchThreads category = { category } search = { search } setErrorStatus = { setErrorStatus }/> }
                    </div>
                    <div className = "forum-right side">
                        <ScrollToTop />
                    </div>
                </div>
                <ThreadCreationPopup open = { createPopup } toggle = { setCreatePopup } refresh = { refresh } userid = { claims.id }/>
                <ThreadSearchPopup open = { searchPopup } toggle = { setSearchPopup } setBackendCategory = { setCategory } setBackendSearch = { setSearch }/>
            </div>
        )
    }

    return (
        <Loading />
    )
}