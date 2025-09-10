import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";

function Balance() {
    const [balance, setBalance] = useState("");
    const [iban, setIban] = useState("");

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await axiosInstance.get("/accounts/main");
                setBalance(response.data.balance);
                setIban(response.data.iban);
            } catch (error) {
                console.error("Balance fetch error:", error);
            }
        }

        fetchBalance();
    }, []);

    return (
        <div className="balance-container">
            <form>
                <label>IBAN</label>
                <input type="text" value={iban} disabled />
                <label>Balance</label>
                <input type="text" value={balance} disabled />
            </form>
        </div>
    );
}

export default Balance;
