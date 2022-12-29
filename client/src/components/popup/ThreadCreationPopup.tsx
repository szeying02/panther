import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

type ThreadCreationPopupProperties = {
    open: Boolean;
    toggle: Function;
    refresh: Function;
    userid: number;
};

let backend = "http://localhost:8000/forum/threads/create";

const ThreadCreationPopup : React.FC<ThreadCreationPopupProperties> = ({ open, toggle, refresh, userid }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Select a Category");
    const [created, setCreated] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200);
    const [titleError, setTitleError] = useState("");
    const [categoryError, setCategoryError] = useState("Select a category before creating a thread.");
    const [contentError, setContentError] = useState("");

    function DropdownCategory() {
        return (
            <Dropdown>
                <Dropdown.Toggle id = "dropdown" variant = "secondary" >
                    Category: {category}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick = {() => chooseCategory("Animals")}> #Animals </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Arts")}> #Arts </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Lifestyle")}> #Lifestyle </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Media")}> #Media </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Politics")}> #Politics </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Sports")}> #Sports </Dropdown.Item>
                    <Dropdown.Item onClick = {() => chooseCategory("Technology")}> #Technology </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }


    const chooseCategory = (cat : string) => {
        setCategory(cat);
        setCategoryError("");
    }

    // handles changes in the title field
    const handleTitle = (e : any) => {
        setTitle(e.target.value);

        if (e.target.value.length <= 3) {
            setTitleError("Title should be more than 3 characters")
        } else if (e.target.value.length > 300) {
            setTitleError("Title should not be more than 300 characters")
        } else {
            setTitleError("")
        }
    }

    // handles changes in the content field
    const handleContent = (e : any) => {
        setContent(e.target.value);

        if (e.target.value.length <= 10) {
            setContentError("Content should be more than 10 characters")
        } else {
            setContentError("")
        }
    }

    // posting to backend
    const handleSubmit = (e :  any) => {
        e.preventDefault()

        const updatedTitle = title.replace(/'/gi, "''");
        const updatedContent = content.replace(/'/gi, "''");

        axios.post(backend, { 
                Title: updatedTitle,
                Content: updatedContent,
                UserID: userid,
                Category: category
        })
        .then(res => {
            setCreated(true);
        }).catch((error) => {
            setErrorStatus(error.response.status)
        });
    }

    const closePopup = () => {
        setCreated(false)
        refresh()
        toggle()
    }

    const allow = titleError === "" && contentError === "" && categoryError === "" && title !== "" && content !== "";

    if (created && open) {
        return (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <Link to = {`/forum/threads`}> 
                            <div className = "popup-close-button" onClick = {() => closePopup()}> x </div> 
                        </Link>
                        <div className = "popup-purpose"> Thread is Created! </div>
                    </div>
                </div>
            </div>
        )
    }

    if (open) {
        return  (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <div className = "popup-purpose"> Create a Thread</div>
                        <div className = "popup-close-button" onClick = {() => closePopup() }> x </div>
                        <div className = "popup-body">
                            <form onSubmit= { handleSubmit }>
                                <div className = "popup-section-title"> 
                                    <input 
                                        type = "text"
                                        id = "title"
                                        name = "title"
                                        onChange = { handleTitle }
                                        value = {title }
                                        placeholder = "Title"
                                        className = "popup-input-title"
                                    />
                                    <div className = "popup-error-msg"> { titleError } </div>
                                </div>

                                <div className = "popup-section-category">
                                    <DropdownCategory />
                                    <div className = "popup-error-msg"> { categoryError } </div>
                                </div>
                            
                                <div className = "popup-section-content"> 
                                    <textarea 
                                        value = { content } 
                                        name = "content"
                                        wrap = "soft"
                                        onChange = { handleContent } 
                                        className = "popup-textarea-content"
                                        placeholder = "Text"
                                    />
                                    <div className = "popup-error-msg"> { contentError } </div>
                                </div>
                                <p className = "popup-section-error"> {!(errorStatus === 200 || errorStatus === 201) ? "Error 500: Internal Server Error. Close to try again.": "" } </p>
                                <button type = "submit" disabled = { !allow } className = "popup-submit-button"> Create Thread </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    return null;
  }
export default ThreadCreationPopup;