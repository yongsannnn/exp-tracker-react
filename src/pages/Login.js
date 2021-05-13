import React, { useContext, useState } from "react";
import LoginContext from "./LoginContext"
import axios from "axios"
import config from "../config"
import { useHistory, Link } from "react-router-dom"

const baseUrl = config.baseUrl

export default function Login() {
    let context = useContext(LoginContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const history = useHistory();

    const changeLogin = async () => {
        const response = await axios.post(baseUrl + "/account/login", {
            "email": email,
            "password": password
        })
        if (response.data._id) {
            localStorage.setItem("id", response.data._id)
            context.changeLogin()
            context.changeUser(response.data._id)
            history.push("/")
        } else {
            setLoginError(true)
        }
    }

    return (
        <React.Fragment>
            <div className="page-width">
                <div className="login-wrapper">
                    <h1>Log In</h1>
                    <input className="login-input" type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="login-input" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <p className="warning-text" style={{
                        display: loginError === true ? "block" : "none"
                    }}>*Invalid credentials. Please try again.</p>
                    <div className="login-btn-wrapper">
                        <button  className="cta" onClick={changeLogin}>Log in</button>  
                    </div>
                    <div>
                        <Link className="create-acc" to="/register">Create account</Link>
                    </div>

                </div>
            </div>
        </React.Fragment>

    )
}