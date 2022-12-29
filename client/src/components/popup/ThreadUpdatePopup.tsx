import axios from "axios";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Thread from "../../types/Thread";

import "./Popup.css";

type ThreadUpdatePopupProperties = {
    open : Boolean;
    toggle : Function;
    thread : Thread;
    backend: string;
    getThread: Function;
    refresh: Function;
};

const ThreadUpdatePopup : React.FC<ThreadUpdatePopupProperties> = ({ open, toggle, thread, backend, getThread, refresh }) => {

    const [title, setTitle] = useState(thread.title);
    const [category, setCategory] = useState(thread.category);
    const [content, setContent] = useState(thread.content);
    const [updated, setUpdated] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200);
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    const id = thread.id


    function DropdownCategory() {
        return (
            <Dropdown>
                <Dropdown.Toggle id = "dropdown" variant = "secondary" >
                    Category: {category}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick = {() => setCategory("Animals")}> #Animals </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Arts")}> #Arts </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Lifestyle")}> #Lifestyle </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Media")}> #Media </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Politics")}> #Politics </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Sports")}> #Sports </Dropdown.Item>
                    <Dropdown.Item onClick = {() => setCategory("Technology")}> #Technology </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
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

    const handleSubmit = (e : any) => {
        e.preventDefault()

        const updatedTitle = title.replace(/'/gi, "''");
        const updatedContent = content.replace(/'/gi, "''");

        axios.put(backend, { 
            ID : id,
            Username: thread.username,
            Title: updatedTitle,
            Content: updatedContent,
            Datetime: "",
            Category: category
        }).then((res) => {
            setUpdated(true)
            getThread();
        }).catch((error) => {
            setErrorStatus(error.response.status)
        });
    }

    const closePopup = () => {
        setUpdated(false)
        refresh()
        toggle(false)
    }

    const allow = titleError === "" && contentError === "" && title !== "" && content !== "";

    if (updated && open) {
        return (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <Link to = {`/forum/threads/${id}`}> 
                            <div className = "popup-close-button" onClick = {() => closePopup()}> x </div> 
                        </Link>
                        <div className = "popup-purpose"> Thread is Edited </div>
                    </div>
                </div>
            </div>
        )
    }

    if (open) {
        return (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                    <div className = "popup-purpose"> Edit Thread</div>
                        <div className = "popup-close-button" onClick = {() => closePopup()}> x </div>
                        <div className = "popup-body">
                            <form onSubmit = { handleSubmit }>
                                <div className = "popup-section-title"> 
                                    <input 
                                        type = "text"
                                        id = "title"
                                        name = "title"
                                        onChange = { handleTitle }
                                        value = { title }
                                        placeholder = "Title"
                                        className = "popup-input-title"
                                    />
                                    <div className = "popup-error-msg"> { titleError } </div>
                                </div>

                                <div className = "popup-section-category">
                                    <DropdownCategory />
                                    <div className = "popup-error-msg" />
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
                                <button type = "submit" disabled = {!allow} className = "popup-submit-button"> Done </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}

export default ThreadUpdatePopup