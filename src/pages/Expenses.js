import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import config from "../config"
import axios from "axios"

const baseUrl = config.baseUrl

export default function Expenses() {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const [expensesList, setExpensesList] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const loadItems = async () => {
            let storedId = localStorage.getItem("id")
            if (storedId) {
                let response = await axios.post(baseUrl + "/expenses", {
                    "user_id": storedId
                })
                setExpensesList(response.data.reverse())
                setIsLoaded(true)
            } else {
                history.push("/login")
            }
        }
        loadItems()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        let subTotal = 0;
        for (let i of expensesList) {
            subTotal += parseFloat(i.amount)
        }
        setTotal(subTotal.toFixed(2))
    }, [expensesList])

    const deleteExpenses = async (e) => {
        await axios.delete(baseUrl + "/expenses/" + e.target.name)

        // Get index
        const expensesIndex = expensesList.findIndex(p => p._id === e.target.name)
        // Clone state
        let cloned = [...expensesList]
        // Remove the tea item using splice
        cloned.splice(expensesIndex, 1)

        setExpensesList(cloned)
    }

    const renderExpensesList = () => {
        let lst = []
        expensesList.map(p =>
            lst.push(
                <React.Fragment key={p._id}>
                    <div>
                        <div className="indi-exp-mandatory">
                            <p>{p.date}</p>
                            <p className="warning-text">${parseFloat(p.amount).toFixed(2)}</p>
                        </div>
                        <p> Category: <span>{p.category}</span></p>
                        <div className="memo-button-wrapper">
                            <p className="memo">{p.memo}</p>
                            <div className="indi-exp-button">
                                <Link to={"/expenses/edit/" + p._id} className="fas fa-edit edit-btn"></Link>
                                <button className="fas fa-trash-alt delete-btn" name={p._id} onClick={deleteExpenses}></button>
                            </div>
                        </div>
                    </div>
                    <p className="grey-line"></p>
                </React.Fragment>
            )
        )
        if (lst.length === 0) {
            lst.push(
                <div className="login-btn-wrapper"><i>No expenses to display.</i></div>
            )
        }
        return lst
    }

    if (isLoaded === false) {
        return (
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="page-width" style={{ display: "block" }}>
                    <div className="expenses-heading">
                        <h1>Account Book</h1>
                        <Link className="cta link-cta" to="/expenses/add">Add</Link>
                    </div>
                    <h5>
                        Total Spending: ${total}
                    </h5>
                    <p className="grey-line"></p>
                    {renderExpensesList()}
                </div>
            </React.Fragment>

        )
    }
}