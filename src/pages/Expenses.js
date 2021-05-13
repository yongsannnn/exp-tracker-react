import React from "react";
import {Link } from "react-router-dom"

export default function Expenses() {
    return (
        <React.Fragment>
            <h1>Expenses</h1>
            <Link to ="/expenses/add">Add</Link>
        </React.Fragment>

    )
}