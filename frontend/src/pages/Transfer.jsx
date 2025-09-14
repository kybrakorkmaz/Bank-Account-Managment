import React, {useState} from "react";
import {Alert, Dropdown, message, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import axiosInstance from "../api/axiosInstance.js";
import transferTypeEnum from "../../../backend/enum/transferTypeEnum.js";


const dropdownData =Object.entries(transferTypeEnum).map(([key, value])=>({
    key: value,
    label: value
}));

function Transfer() {

    // Valid IBAN: "TR001234567890123456789012"
    // Invalid IBAN: "TR00INVALIDIBAN123456789012"
    const [dropdownValue, setDropdownValue] = useState(null);
    const [bankName, setBankName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [receiverIban, setReceiverIban] = useState("");
    const [senderIban, setSenderIban] = useState("");
    const [ibanError, setIbanError] = useState(false);
    const [openTransferType, setOpenTransferType] = useState(false);
    const [amount, setAmount] = useState("");

    const turkishIbanRegex =  /^TR\d{24}$/;
    const isValidIban = (iban) => turkishIbanRegex.test(iban.toUpperCase());

    const dropdownDataClick = ({key}) =>{
        setDropdownValue(key);
    };

    const handleIbanChange = (e) => {
        const { name, value } = e.target;
        if (name === "senderIban") {
            setSenderIban(value);
        } else if (name === "receiverIban") {
            setReceiverIban(value);
        }
        console.log("IBAN entered:", name + " " + value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!receiverIban || !amount || !bankName || !dropdownValue || !receiverName) {
            message.warning("All fields must be filled!", 2);
            return;
        }
        const isValid = isValidIban(receiverIban);
        setIbanError(!isValid);
        if (!isValid) {
            setIbanError(true);
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            message.warning("Please enter a valid amount.", 2);
            setAmount("");
            return;
        }
        const payload = {
            transferTypes: dropdownValue,
            senderIban: senderIban.toUpperCase(),
            receiverBank: bankName,
            receiverIban: receiverIban.toUpperCase(),
            receiverName: receiverName,
            amount: parsedAmount
        };
        try{
            const response = await axiosInstance.post("/transfer", payload);
            if(response.status === 200) return message.success("Money successfully transferred!", 2);
        }catch (error){
            if (error.response?.status === 400) {
                message.warning("Balance not enough", 2);
            } else {
                message.error("Transfer failed", 2);
            }
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
                        <label>Sender Account IBAN</label>
                        <input
                            type="text"
                            name="senderIban"
                            value={senderIban}
                            onChange={handleIbanChange}
                            maxLength="26"
                        />
                    </div>
                    <div className="transfer-form-item">
                        <label>Receiver Bank</label>
                        <input type="text"  value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </div>

                    <div className="transfer-form-item">
                        <label>Receiver IBAN</label>
                        <input
                            type="text"
                            name="receiverIban"
                            value={receiverIban}
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
