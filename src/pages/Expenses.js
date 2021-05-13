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

    const renderExpensesList = () => {
        let lst = []
        expensesList.map(e =>
            lst.push(
                <React.Fragment>
                    <div key={e._id}>
                        <p>{e.date}</p>
                        <p>{e.amount}</p>
                        <p>{e.category}</p>
                        <p>{e.memo}</p>
                            <button>Edit</button>
                            <button>Delete</button>
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