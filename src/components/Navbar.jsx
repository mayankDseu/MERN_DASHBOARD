import React, { useContext } from "react";
import { User } from "../Context/context";
import { Link } from "react-router-dom";

function Navbar() {
    const {user, setUser} = useContext(User);

    const handleLogout = () => {
        setUser({
            loggedIn: false,
            id: "",
            name: "",
            email:"",
            role:"",
            address:""
        })
        localStorage.removeItem("user");
    }

    return(
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/" style={{textDecoration: "none", color: "white"}}>Dashboard</Link>
            </div>
            <div className="nav-links">
            <a>Home</a>
            <a>About</a>
            <a>Contact</a>
            </div>
            <div className="nav-profile">
                <div className="profile-box">
                    <ion-icon name="person" />
                    <p>{user.name}</p>
                    <Link to="/login" style={{textDecoration: "none"}}><button onClick={handleLogout}>Log Out</button></Link>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar;
