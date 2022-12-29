import React from "react";
import axios from "axios";

import Comment from "../types/Comment";
import CommentsList from "./CommentsList";

export default class ForumThreads extends React.Component<{ id: string, userid: number, setErrorStatus: Function, refresh: Function }> {

    state = {
        comments: [] as Comment[],
        backend: `http://localhost:8000/forum/comments/${this.props.id}`
    }

    fetchData(backend : string) : void {
        axios.get(backend)
            .then(res => {
                const comments = res.data["comments"];
                this.setState({ comments });
            })
            .catch(err => {
                this.props.setErrorStatus(err.response.status)
            })
    }
  
    componentDidMount() : void {
        this.fetchData(this.state.backend);
    }

    componentDidUpdate(prevProps: Readonly<{ id: string; setErrorStatus: Function; }>): void {
        if (this.props !== prevProps) {
            this.fetchData(this.state.backend);
        }
    }
  
    render() {
        return (
            <CommentsList comments = {this.state.comments} userid = { this.props.userid } setErrorStatus = { this.props.setErrorStatus } refresh = { this.props.refresh }/>
        )
    }
}