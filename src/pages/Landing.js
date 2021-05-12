import React from "react";
import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <React.Fragment>
            <h2 className="hero-text">Welcome to Expense Tracker</h2>
            <Link to="/login"> Click Here to login</Link>
        </React.Fragment>
    );
}