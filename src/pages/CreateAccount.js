import React, { useState } from "react";
import axios from "axios"
import config from "../config"
import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl


export default function CreateAccount() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordShort, setIsPasswordShort] = useState(false)
    const [isPasswordDifferent, setIsPasswordDifferent] = useState(false)
    const [isEmailFormat, setIsEmailFormat] = useState(false)
    const [registerError, setRegisterError] = useState(false)


    function validateEmail(email) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);
    }

    const submitDetails = async () => {
        if (validateEmail(email) === false) {
            setIsEmailFormat(true)
        } else {
            setIsEmailFormat(false)
        }
        if (password.length < 6) {
            setIsPasswordShort(true)
        } else {
            setIsPasswordShort(false)
        }
        if (password !== confirmPassword) {
            setIsPasswordDifferent(true)
        } else {
            setIsPasswordDifferent(false)
        }

        if (isEmailFormat === false && isPasswordDifferent === false && isPasswordShort === false){
            const response = await axios.post(baseUrl + "/account/create", {
                "email": email,
                "password": password
            })
            if (response.data === "Account created."){
                history.push("/login")
            } else {
                setRegisterError(true)
            }
        }
    }

    return (
        <React.Fragment>
            <h1>Create Account</h1>
            <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <p style={{ display: isEmailFormat === true ? "block" : "none" }}>*Invalid Email format.</p>
            <p style={{ display: isPasswordShort === true ? "block" : "none" }}>*Password is too short. </p>
            <p style={{ display: isPasswordDifferent === true ? "block" : "none" }}>*Password does not match. </p>
            <button onClick={submitDetails}>Submit</button>
            <p style={{ display: registerError === true ? "block" : "none" }}>*Unable to create account. Check error messages or try again later. </p>
        </React.Fragment>
    )
}