import React from "react";
import { Link } from "react-router-dom"


export default function Header() {
    return (
        <React.Fragment>
            <h1>Logout</h1>
            <p>You have successfully logout</p> 
            <p>Click below if you want to login again! </p>
            <Link to="/login">Log In</Link>
        </React.Fragment>

    )
}