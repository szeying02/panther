import { useEffect, useState } from "react";
import "./ErrorPage.css"

type ErrorProperties = {
    status: number;
};

const ErrorPage : React.FC<ErrorProperties> = ({ status }) => {

    const [errorResponse, setErrorResponse] = useState("");

    useEffect(() => {
        determineErrorResponse();
      }, []);

    const determineErrorResponse = () => {
        if (status === 401) {
            setErrorResponse("Unauthorised. User is currently unauthenticated. Please login again.")
        } else if (status === 404) {
            setErrorResponse("Page not found.")
        } else if (status === 500) {
            setErrorResponse("Internal Server Error.")
        } else {
            setErrorResponse("Please raise this issue on github detailing the steps on how it led to this error. Thank you.")
        }
    }

    return (
        <div className = "error-main">
            <div className = "error-header"> 
                <div className = "error-name"> PANTHER </div>
                <div className = "error-msg"> Error { status } </div>
            </div>
            <div className = "error-response"> { errorResponse } </div>
        </div>
    )
}

export default ErrorPage;