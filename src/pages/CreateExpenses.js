import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

export default function CreateExpenses() {
    const history = useHistory();
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [memo, setMemo] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAmountNegative, setAmountNegative] = useState(false)


    useEffect(() => {
        const checkUser = async () => {
            if (localStorage.getItem("id")) {
                setIsLoaded(true)
            } else {
                history.push("/login")
            }
        }
        checkUser()
        // eslint-disable-next-line 
    }, [])

    const addExpenses = async () => {
        if (amount < 0){
            setAmountNegative(true)
        } else {
            setAmountNegative(false)
        }

        if (isAmountNegative === false){
            console.log("Sending this info to axios", amount, date, category, memo)
        }
    }

    if (isLoaded === false) {
        return (
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <h1>Add New Expenses</h1>
                <input type="number" name="amount" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></input>
                <input type="date" name="date" value={date} placeholder="Date" onChange={(e) => setDate(e.target.value)}></input>
                <select name="cuisine_type" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Category</option>
                    <option>Food</option>
                    <option>Groceries</option>
                    <option>Social</option>
                    <option>Transport</option>
                    <option>Others</option>
                </select>
                <textarea rows="4" cols="50" name="memo" value={memo} placeholder="Memo" onChange={(e) => setMemo(e.target.value)}></textarea>
                <button onClick={addExpenses}>Complete</button>
            </React.Fragment>
        )
    }
}   