import React, { useState } from "react";
import { Alert } from "antd";

function Transfer() {

    // Valid IBAN: "TR330006100519786457841326"
    // Invalid IBAN: "TR00INVALIDIBAN123456789012"

    const [iban, setIban] = useState("");
    const [ibanError, setIbanError] = useState(false);

    const turkishIbanRegex = /^TR[0-9]{2}[0-9]{5}[0-9]{16}$/;
    const isValidIban = (iban) => turkishIbanRegex.test(iban.toUpperCase());

    const handleIbanChange = (e) => {
        setIban(e.target.value);
        console.log("IBAN entered:", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = isValidIban(iban);
        setIbanError(!isValid);

        if (isValid) {
            console.log("Valid IBAN. Initiating transfer...");
            // Transfer logic goes here
        }
    };

    return (
        <>
            {ibanError && (
                <Alert
                    message="Invalid IBAN format"
                    description="Please check the IBAN number. It must start with TR and contain 26 characters."
                    type="warning"
                    showIcon
                    style={{ marginBottom: "16px" }}
                    closable
                    onClose={() => setIbanError(false)}
                />
            )}
            <div className="transfer-form-wrapper">
                <form className="transfer-form" onSubmit={handleSubmit}>
                    <div className="transfer-form-item">
                        <label>Bank Name</label>
                        <input type="text" placeholder="Enter bank name" />
                    </div>

                    <div className="transfer-form-item">
                        <label>User IBAN</label>
                        <input
                            type="text"
                            placeholder="Enter IBAN"
                            value={iban}
                            onChange={handleIbanChange}
                            maxLength="26"
                        />
                    </div>

                    <div className="transfer-form-item">
                        <label>User Name</label>
                        <input type="text" placeholder="Enter user name" />
                    </div>

                    <div className="transfer-form-item">
                        <label>Amount</label>
                        <input type="text" placeholder="Enter amount" />
                    </div>

                    <div className="confirm-button">
                        <button type="submit">
                            Transfer
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Transfer;
