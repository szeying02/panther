import React from "react";
import axios from "axios";

import Thread from "../types/Thread";
import ThreadsList from "./ThreadsList";

export default class ForumThreads extends React.Component<{ backend : string, setErrorStatus: Function }> {

    state = {
        threads: [] as Thread[],
    }

    fetchData(backend : string) : void {
        axios.get(backend)
            .then(res => {
                const threads = res.data["threads"];
                this.setState({ threads });
            })
            .catch(err => {
                this.props.setErrorStatus(err.response.status)
            })
    }
  
    componentDidMount() : void {
        this.fetchData(this.props.backend);
    }

    componentDidUpdate(prevProps: Readonly<{ backend: string; setErrorStatus: Function; }>): void {
        if (this.props.backend !== prevProps.backend) {
            this.fetchData(this.props.backend);
        }
    }
  
    render() {
        return (
            <ThreadsList threads = {this.state.threads} />
        )
    }
}