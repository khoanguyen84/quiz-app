import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const handleGoToLogin = () => {
        navigate("/")
    }
    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="row col-sm-6 mt-5 border border-danger py-5 px-3">
                <h1 className="text-center text-danger">404 NOT FOUND</h1>
                <button type="button" className="btn btn-danger btn-block my-4" onClick={handleGoToLogin}>
                    GO TO LOGIN PAGE
                </button>
            </div>
        </div>
    )
}

export default NotFound;