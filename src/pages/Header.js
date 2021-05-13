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
            <h1>Header</h1>
            <Link to ="/expenses">Home</Link>
            <Link style={{
                display: context.checkLogin() === true ? "block" : "none"
            }} to="/" onClick={logoutUser}>Log Out</Link>
            <Link style={{
                display: context.checkLogin() === false ? "block" : "none"
            }} to="/login">Log In</Link>
        </React.Fragment>

    )
}