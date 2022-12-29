import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stretch from "../../assets/Stretch";
import ErrorPage from "../ErrorPage";
import "./Authentication.css";

export default function Login() {

    document.body.style.overflow = 'hidden';

    let backend = "http://localhost:8000/login";
    let navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorStatus, setErrorStatus] = useState(200);

    // handles changes in the username field
    const handleUsername = (e : any) => {
        const result = e.target.value.trim();
        setUsername(result);
    }
    
    // handles changes in the password field
    const handlePassword = (e : any) => {
        const result = e.target.value.trim();
        setPassword(result);
    }

    const handleSubmit = (e : any) => {
        e.preventDefault()
        axios.post(backend, { 
            Username : username,
            Password : password
        })
        .then(() => {
            navigate("/forum/threads")
        }).catch((error) => {
            setErrorMessage(error.response.data)
            setErrorStatus(error.response.status)
        });
    }

    

    if (!(errorStatus === 200 || errorStatus === 201 || errorStatus === 400)) {
        return (
            <ErrorPage status = { errorStatus } />
        )
    }

    return (
        <div className = "auth-background">
            <div className = "auth-row">
                <div className = "auth-logo">
                    <Stretch />
                </div>
                <div className = "auth-box">
                    <div className = "auth-close-button">
                        <Link to = "/" className = "auth-link"> {"X"} </Link>
                    </div>
                    <div className = "auth-content">
                        <form onSubmit = { handleSubmit }>
                            <div className = "auth-field">
                                <label> Username </label>
                                <input 
                                    type = "text"
                                    id = "username"
                                    name = "username"
                                    onChange = {handleUsername}
                                    value = {username}
                                />
                            </div>
                            <br />
                            <div className = "auth-field">
                                <label> Password </label>
                                <input 
                                    type = "password"
                                    id = "password"
                                    name = "password"
                                    onChange = {handlePassword}
                                    value = {password}
                                />
                            </div>
                            <br />
                            <div className = "auth-error-message"> { errorMessage } </div>
                            <br />
                            <button className = "auth-submit-button" type = "submit"> LOGIN </button>
                        </form>
                        <br />
                        <div className = "auth-register-line">
                            Don't have an account?
                            <Link to = "/register" className = "auth-link"> <u> Register </u> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}