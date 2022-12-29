import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Paw from "../assets/Paw";
import "./ForumNavBar.css";

interface ForumNavBarProps {
    setErrorStatus : Function;
    setCreatePopup : Function;
};

export default function ForumNavBar({setErrorStatus, setCreatePopup} : ForumNavBarProps) {

    document.body.style.overflow = 'auto';

    let backend = "http://localhost:8000/auth/logout";
    let navigate = useNavigate();

    const logout = () => {
        axios.post(backend)
        .then(() => {
            navigate("/")
        }).catch((error) => {
            setErrorStatus(error.response.status)
        });
    }

    return (
        <div className = "forum-navbar">
            <div className = "forum-navbar-main">
                <div className = "forum-navbar-logo"> <Paw /> </div>
                <Link className = "forum-navbar-name" to = "/forum/threads"> PANTHER </Link>
            </div>
            <div className = "forum-navbar-right">
                <Link to = "/forum/threads/search"> <BiSearch className = "button-search" /> </Link> 
                <div className = "button-thread-creation" onClick = {() => setCreatePopup(true)}> + </div>
                <div className = "button-logout" onClick = {() => logout()}> LOGOUT </div>
            </div>
        </div>
    );
}