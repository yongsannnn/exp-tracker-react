import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react"
import Login from "./pages/Login"
import Header from "./pages/Header"
import Landing from "./pages/Landing"
import Expenses from "./pages/Expenses"
import LoginContext from "./pages/LoginContext"
import CreateAccount from "./pages/CreateAccount"
import CreateExpenses from "./pages/CreateExpenses"
import './App.css';
// import { useEffect } from "react/cjs/react.production.min";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")

    const context = {
        checkLogin: () => {
            return loggedIn
        },
        checkUserId: () => {
            return userId
        },
        changeUser: (id) => {
            setUserId(id)
        },
        changeLogin: () => {
            if (loggedIn === false) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        }
    }

    // check if localstorage has id
    useEffect(()=>{
        const checkStorage = async () => {
            const storedId = localStorage.getItem("id")
            if (storedId) {
                setUserId(storedId)
                setLoggedIn(true)
            }
        }
        checkStorage()
    },[])

    return (
        <LoginContext.Provider value={context}>
            <React.Fragment>
                <Router>
                    <Header />
                    <section style={{ minHeight: "80vh" }}>
                        <Switch>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/register">
                                <CreateAccount />
                            </Route>
                            <Route exact path="/expenses">
                                <Expenses />
                            </Route>
                            <Route exact path="/expenses/add">
                                <CreateExpenses />
                            </Route>
                            <Route exact path="/expenses/edit/:expense_id">
                                <CreateExpenses />
                            </Route>
                        </Switch>
                    </section>
                </Router>
            </React.Fragment>
        </LoginContext.Provider>
    );
}

export default App;
