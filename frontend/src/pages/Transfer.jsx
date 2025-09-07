import React, {use, useState} from "react";
import {Alert, Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";

const dropdownData = [
    {key: "EFT", label:"EFT"},
    {key: "Transfer", label: "Transfer"},
    {key: "Virman", label: "Virman"}
];

function Transfer() {

    // Valid IBAN: "TR330006100519786457841326"
    // Invalid IBAN: "TR00INVALIDIBAN123456789012"
    const [dropdownValue, setDropdownValue] = useState(null);
    const [bankName, setBankName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [iban, setIban] = useState("");
    const [ibanError, setIbanError] = useState(false);
    const [openTransferType, setOpenTransferType] = useState(false);
    const [amount, setAmount] = useState("");

    const turkishIbanRegex = /^TR[0-9]{2}[0-9]{5}[0-9]{16}$/;
    const isValidIban = (iban) => turkishIbanRegex.test(iban.toUpperCase());

    const transferType = dropdownData.map(({key, label}) => ({
        key,
        label
    }));

    const dropdownDataClick = ({key}) =>{
        setDropdownValue(key);
    };

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
            return;
        }

        const payload = {
            transferTypes: dropdownValue,
            senderIban: iban,
            receiverBank: bankName,
            receiverIban: iban, //eğer farklıysa farklı state tanımla
            amount
        };
        /*try {
            const response = await fetch("http://localhost:8080/api/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Transfer failed");
            console.log("Transfer successful");
        } catch (err) {
            console.error(err);
        }*/

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
                        <label>Transfer Type</label>
                        <Dropdown className="dropdown"
                                  menu={{ items: dropdownData, onClick: dropdownDataClick }}
                                  open={openTransferType}
                                  onOpenChange={(o) => setOpenTransferType(o)}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {dropdownValue
                                        ? dropdownData.find(a => a.key === dropdownValue)?.label
                                        : "Select"}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="transfer-form-item">
                        <label>Receiver Bank</label>
                        <input type="text"  value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </div>

                    <div className="transfer-form-item">
                        <label>Receiver IBAN</label>
                        <input
                            type="text"
                            value={iban}
                            onChange={handleIbanChange}
                            maxLength="26"
                        />
                    </div>

                    <div className="transfer-form-item">
                        <label>Receiver Name</label>
                        <input type="text"  value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                    </div>

                    <div className="transfer-form-item">
                        <label>Amount</label>
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
