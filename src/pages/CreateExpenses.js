import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom"
import LoginContext from "./LoginContext"
import axios from "axios"
import config from "../config"

const baseUrl = config.baseUrl

export default function CreateExpenses() {
    const history = useHistory();
    let context = useContext(LoginContext)
    let { expense_id } = useParams();
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [memo, setMemo] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAmountNegative, setAmountNegative] = useState(false)
    const [mandatoryEmpty, setMandatoryEmpty] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            if (localStorage.getItem("id")) {
                if (expense_id) {
                    // Code below are for editing
                    let response = await axios.post(baseUrl + "/individual/expenses", {
                        "id": expense_id
                    })
                    setAmount(response.data.amount)
                    setDate(response.data.date)
                    setCategory(response.data.category)
                    setMemo(response.data.memo)
                    setIsEditing(true)
                    setIsLoaded(true)
                } else {
                    // Load page for Create
                    setIsLoaded(true)
                }
            } else {
                history.push("/login")
            }
        }
        checkUser()
        // eslint-disable-next-line 
    }, [])

    const addExpenses = async () => {
        // Amount and Date is mandatory
        // Amount cannot be negative
        if (amount < 0) {
            setAmountNegative(true)
        } else {
            setAmountNegative(false)
        }

        if (isAmountNegative === false && date !== "" && amount > 0) {
            const response = await axios.post(baseUrl + "/expenses/add", {
                "user_id": context.checkUserId(),
                "amount": amount,
                "date": date,
                "category": category,
                "memo": memo
            })
            if (response.data === "Expenses added.") {
                history.push("/")
            } else {
                setErrorMessage(true)
            }
        } else {
            setMandatoryEmpty(true)
        }
    }

    const editExpenses = async () => {
        if (amount < 0) {
            setAmountNegative(true)
        } else {
            setAmountNegative(false)
        }
        if (isAmountNegative === false && date !== "" && amount > 0) {
            const response = await axios.put(baseUrl + "/expenses/edit", {
                "expense_id": expense_id,
                "user_id": context.checkUserId(),
                "amount": amount,
                "date": date,
                "category": category,
                "memo": memo
            })
            if (response.data === "Expense updated.") {
                history.push("/")
            } else {
                setErrorMessage(true)
            }
        } else {
            setMandatoryEmpty(true)
        }
    }

    if (isLoaded === false) {
        return (
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="page-width">
                    <div className="login-wrapper create-wrapper">
                        <h1 style={{
                            display: isEditing === false ? "block" : "none"
                        }}>Add Expenses</h1>
                        <h1 style={{
                            display: isEditing === true ? "block" : "none"
                        }}>Edit Expenses</h1>
                        <label>Amount<span className="warning-text">*</span></label>
                        <input className="login-input" type="number" name="amount" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></input>
                        <label>Date<span className="warning-text">*</span></label>
                        <input className="login-input" type="date" name="date" value={date} placeholder="Date" onChange={(e) => setDate(e.target.value)}></input>
                        <label>Category</label>
                        <select className="login-input" name="cuisine_type" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled selected hidden>Select a category</option>
                            <option>Food</option>
                            <option>Groceries</option>
                            <option>Social</option>
                            <option>Transport</option>
                            <option>Others</option>
                        </select>
                        <label>Memo</label>
                        <textarea className="login-input" rows="4" cols="50" name="memo" value={memo} placeholder="Write something here!" onChange={(e) => setMemo(e.target.value)}></textarea>
                        <div>
                            <p className="warning-text"><span>*</span>Mandatory fields.</p>
                        </div>
                        <div className="login-btn-wrapper">
                            <button className="cta" style={{
                                display: isEditing === false ? "block" : "none"
                            }} onClick={addExpenses}>Add</button>
                            <button className="cta" style={{
                                display: isEditing === true ? "block" : "none"
                            }} onClick={editExpenses}>Complete</button>
                            <Link className="cta back-cta" to="/">Back</Link>
                        </div>
                        <div className="mt-2">
                            <p className="warning-text" style={{
                                display: mandatoryEmpty === true ? "block" : "none"
                            }}>Check if all mandatory fields are filled.</p>
                            <p className="warning-text" style={{
                                display: errorMessage === true ? "block" : "none"
                            }}>Unable to create expenses. Try again later.</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}   