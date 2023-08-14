import React from "react";
import logo from '../../assets/logo.jpg';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-success py-0">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>
                    <img src={logo} alt="" className="rounded-circle logo-sm me-2" />
                    QUIZ APP
                </Link>
                
                <div className="dropdown">
                    <button className="btn btn-link text-white" > Khoa Nguyễn</button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">History</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">Logout</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar