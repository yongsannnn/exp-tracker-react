import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react"
import Login from "./pages/Login"
import Header from "./pages/Header"
import Landing from "./pages/Landing"
// import './App.css';

function App() {
    return (
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
                    </Switch>
                </section>
            </Router>
        </React.Fragment>
    );
}

export default App;
