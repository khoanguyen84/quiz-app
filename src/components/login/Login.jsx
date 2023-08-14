import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        navigate("/setting")
    }
    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <div className="row col-sm-6 mt-5 border py-5 px-3">
                <h1 className="text-center text-success">QUIZ APP</h1>
                <button type="button" className="btn btn-success btn-block my-4" onClick={handleGoogleLogin}>
                    <i className="fab fa-google me-2"/>
                    Login With Google
                </button>
            </div>
        </div>
    )
}

export default Login;