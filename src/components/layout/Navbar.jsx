import React, { useContext } from "react";
import logo from '../../assets/logo.jpg';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase/config";

function Navbar() {
    const user = useContext(AuthContext)
    return (
        <nav className="navbar navbar-dark bg-success py-0">
            <div className="container">
                <Link className="navbar-brand" to={"/setting"}>
                    <img src={logo} alt="" className="rounded-circle logo-sm me-2" />
                    QUIZ APP
                </Link>
                
                <div className="dropdown">
                    <div>
                        {user.photoURL && <img className="avatar-sm rounded-circle" src={user.photoURL} alt="" />}
                        <button className="btn btn-link text-white" >{user.displayName || user.email}</button>
                    </div>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">History</a>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={async () => await auth.signOut()}>Logout</button>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar