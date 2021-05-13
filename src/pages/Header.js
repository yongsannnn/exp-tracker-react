import React, { useContext } from "react";
import LoginContext from "./LoginContext"
import { Link } from "react-router-dom"


export default function Header() {
    let context = useContext(LoginContext)

    const logoutUser = async () => {
        localStorage.clear()
        context.changeLogin()
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-light bg-light p-3">
                <Link className="navbar-brand" style={{ display: "flex", height: "40px" }} to="/">
                    <img src={require("../tracker.png").default} alt="logo" /> <p className="logo-title">E-Track</p>
                </Link>
                <Link className="navbar-brand" style={{
                    display: context.checkLogin() === true ? "block" : "none"
                }} to="/logout" onClick={logoutUser}>Log Out</Link>
                <Link className="navbar-brand" style={{
                    display: context.checkLogin() === false ? "block" : "none"
                }} to="/login">Log In</Link>
            </nav>
        </React.Fragment>

    )
}