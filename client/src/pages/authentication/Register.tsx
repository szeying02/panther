import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stretch from "../../assets/Stretch";
import ErrorPage from "../ErrorPage";
import "./Authentication.css"


export default function Register() {

    document.body.style.overflow = 'hidden';

    let backend = "http://localhost:8000/register";
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorStatus, setErrorStatus] = useState(200);

    // handles changes in the username field
    const handleUsername = (e : any) => {

        // Allows only alphanumeric characters
        var result = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        result = result.trim();
        setUsername(result);

        if (result.length <= 3) {
            setUsernameError("Username should be more than 3 characters")
        } else if (result.length > 50) {
            setUsernameError("Username should not be more than 50 characters")
        } else {
            setUsernameError("")
        }
    }
    
    // handles changes in the password field
    const handlePassword = (e : any) => {
        var result = e.target.value.trim();
        result = result.trim();
        setPassword(result);

        if (result.length <= 8) {
            setPasswordError("Password should be more than 8 characters")
        } else if (result.length > 50) {
            setPasswordError("Password should not be more than 50 characters")
        } else {
            setPasswordError("")
        }
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
            setErrorStatus(error.response.status)
            if (error.response.status === 400) {
                setUsernameError(error.response.data)
            }
        });
    }

    const allow = usernameError === "" && passwordError === "" && username !== "" && password !== ""

    if (!(errorStatus === 200 || errorStatus === 201 || errorStatus === 400)) {
        return (
            <ErrorPage status = { errorStatus } />
        )
    }

    return (
        <div className = "auth-background">
            <div className = "auth-row">
                <div className = "auth-logo-flip">
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
                                    className = "auth-input"
                                />
                            </div>
                            <br />
                            <div className = "auth-error-message"> {usernameError} </div>
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
                            <div className = "auth-error-message"> {passwordError} </div>
                            <br />
                            <button className = "auth-submit-button" type = "submit" disabled = {!allow}> Register </button>
                        </form>
                        <br />
                        <div className = "auth-login-line">
                            Already have an account?
                            <Link to = "/login" className = "auth-link"> <u> Login </u> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}