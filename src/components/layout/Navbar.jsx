import React from "react";
import logo from '../../assets/logo.jpg';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-success">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>
                    <img src={logo} alt="" className="rounded-circle logo-sm me-2" />
                    QUIZ APP
                </Link>
            </div>
        </nav>
    )
}

export default Navbar