import axios from "axios";
import React from "react";
import Thread from "../types/Thread";
import ThreadsList from "./ThreadsList";

export default class SearchThreads extends React.Component<{ search : string, category : string, setErrorStatus: Function }> {

    state = {
        threads: [] as Thread[],
        noResults: false,
    }

    fetchData(backend : string) : void {
        axios.get(backend)
            .then(res => {
                const threads = res.data["threads"];
                if (threads !== null) {
                    this.setState({ threads: threads, noResults: false });
                } else {
                    this.setState({ noResults: true })
                }
                
            })
            .catch(err => {
                this.props.setErrorStatus(err.response.status)
            })
    }
  

    createBackend() : void {
        var backend = "";
        if (this.props.search === "" && this.props.category === "None") {
            backend = "";
            return
        } else if (this.props.category === "None") {
            backend = `http://localhost:8000/forum/threads/search/${this.props.search}`;
        } else if (this.props.search === "") {
            backend = `http://localhost:8000/forum/threads/filter/${this.props.category}`;
        } else {
            backend = `http://localhost:8000/forum/threads/searchandfilter/${this.props.search}/${this.props.category}`;
        }
        this.fetchData(backend);
    }

    componentDidMount(): void {
        this.createBackend();
    }

    componentDidUpdate(prevProps: Readonly<{ search : string, category : string, setErrorStatus: Function }>): void {
        if (this.props !== prevProps) {
            this.createBackend();
        }
    }
    
    render() {

        if (this.state.noResults) {
            return (
                <div className = "search-empty">
                    <div className = "search-empty-text"> No results found. </div>
                 </div>
            )
        }

        return (
            <ThreadsList threads = { this.state.threads }/>
        );
    }
}