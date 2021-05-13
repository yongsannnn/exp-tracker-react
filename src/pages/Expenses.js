import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import config from "../config"
import axios from "axios"

const baseUrl = config.baseUrl

export default function Expenses() {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const [expensesList, setExpensesList] = useState([])

    useEffect(() => {
        const loadItems = async () => {
            let storedId = localStorage.getItem("id")
            if (storedId) {
                let response = await axios.post(baseUrl + "/expenses", {
                    "user_id": storedId
                })
                setExpensesList(response.data)
                setIsLoaded(true)
            } else {
                history.push("/login")
            }
        }
        loadItems()
        // eslint-disable-next-line 
    }, [])
    
    const deleteExpenses = async (e) => {
        await axios.delete(baseUrl+"/expenses/"+e.target.name)

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
                        <p>{p.date}</p>
                        <p>{p.amount}</p>
                        <p>{p.category}</p>
                        <p>{p.memo}</p>
                            <Link to ={"/expenses/edit/" + p._id}>Edit</Link>
                            <button name={p._id} onClick={deleteExpenses}>Delete</button>
                    </div>
                    <p className="grey-line"></p>
                </React.Fragment>
            )
        )
        if (lst.length === 0) {
            lst.push(
                <div>No expenses to display.</div>
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
                <h1>Expenses</h1>
                <Link to="/expenses/add">Add</Link>

                <h6>
                    All expenses
                </h6>
                {renderExpensesList()}
            </React.Fragment>

        )
    }
}