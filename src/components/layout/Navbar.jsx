import React from "react";
import logo from '../../assets/logo.jpg';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/")
    }
    return (
        <nav className="navbar navbar-dark bg-success py-0">
            <div className="container">
                <Link className="navbar-brand" to={"/setting"}>
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
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar