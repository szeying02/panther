import Thread from "../types/Thread"
import ThreadCard from "./ThreadCard";

type ThreadsListProperties = {
    threads: Thread[],
}

const ThreadsList : React.FC<ThreadsListProperties> = ({ threads }) => {
    return (
        <ul>
            {threads
                .map(thread => 
                    <ThreadCard thread = {thread} />
                )
            }
        </ul>
    )
}

export default ThreadsList;