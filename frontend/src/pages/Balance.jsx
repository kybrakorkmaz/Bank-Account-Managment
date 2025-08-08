import React from "react";
import {Alert} from "antd";

function Balance() {
    return (
        <>
            <div className="balance-container">
                <form>
                    <label>IBAN</label>
                    <input type={"text"} placeholder="IBAN" disabled />
                    <label>Balance</label>
                    <input type={"text"} placeholder="Amount" disabled />
                </form>
            </div>
        </>

    );
}

export default Balance;