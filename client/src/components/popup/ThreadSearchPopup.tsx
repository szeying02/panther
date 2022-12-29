import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./Popup.css";

type ThreadSearchPopupProperties = {
    open: Boolean;
    toggle: Function;
    setBackendCategory: Function;
    setBackendSearch: Function;
};

const ThreadSearchPopup : React.FC<ThreadSearchPopupProperties> = ({ open, toggle, setBackendCategory, setBackendSearch }) => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("None");

    const handleSearch = (e : any) => {
        setSearch(e.target.value);
    }

    function DropdownCategory() {
        return (
            <Dropdown>
                <Dropdown.Toggle id = "dropdown" variant = "secondary" >
                    Category: {category}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick = {() => setCategory("None")}> None </Dropdown.Item>
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

    const handleSubmit = (e : any) => {
        e.preventDefault()
        setBackendCategory(category);
        setBackendSearch(search);
        toggle();
    }

    if (open) {
        return (
            <div className = "popup-background">
                <div className = "popup-box">
                    <div className = "popup-content">
                        <div className = "popup-purpose"> Search for Threads</div>
                        <div className = "popup-close-button" onClick = {() => toggle() }> x </div>
                        <div className = "popup-body">
                            <form onSubmit = { handleSubmit }>
                                <div className = "popup-section-title"> 
                                    <input 
                                        type = "text"
                                        id = "search"
                                        name = "search"
                                        onChange = { handleSearch }
                                        placeholder = "Search"
                                        value = { search }
                                        className = "popup-input-title"
                                    />
                                    <div className = "popup-error-msg" />
                                </div>

                                <div className = "popup-section-category">
                                    <DropdownCategory />
                                    <div className = "popup-error-msg"/>
                                </div>
                                <button type = "submit" className = "popup-submit-button"> Search </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return null;
}

export default ThreadSearchPopup;