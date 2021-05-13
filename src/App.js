import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react"
import Login from "./pages/Login"
import Header from "./pages/Header"
import Landing from "./pages/Landing"
import Expenses from "./pages/Expenses"
import LoginContext from "./pages/LoginContext"
// import './App.css';

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
                            <Route exact path="/expenses">
                                <Expenses />
                            </Route>
                        </Switch>
                    </section>
                </Router>
            </React.Fragment>
        </LoginContext.Provider>
    );
}

export default App;
