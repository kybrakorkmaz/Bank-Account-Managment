import React, {useState} from "react";
import { DownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import accountTypeEnum from "../../../../backend/enum/accountTypeEnum.js"
import currencyTypeEnum from "../../../../backend/enum/currencyTypeEnum.js";
import axiosInstance from "../../api/axiosInstance.js";
import { message } from "antd";

const accountTypes = Object.entries(accountTypeEnum).map(([key, value])=>({
    label: value.charAt(0).toUpperCase() + value.slice(1), //Loan
    key: value //loan
}));

const currencyTypes = Object.entries(currencyTypeEnum).map(([key, value])=>({
    label: value,
    key: value
}));


function CreateAccount({ onBack, onAccountCreated }) {
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [openAccountType, setOpenAccountType] = useState(false);
    const [openCurrency, setOpenCurrency] = useState(false);
    const [balance, setBalance] = useState("");

    const handleAccountTypeClick = (e) => {
        setSelectedAccountType(e.key);
        setOpenAccountType(false);
    };

    const handleCurrencyClick = (e) => {
        setSelectedCurrency(e.key);
        setOpenCurrency(false);
    };

    async function handleAccountSave() {
        const parsedBalance = parseInt(balance);
        if (isNaN(parsedBalance) ||parsedBalance < 0) {
            message.warning("Please enter a valid balance.", 2);
            return;
        }
        if (!selectedAccountType || !selectedCurrency || !balance) {
            message.warning("Please fill in all fields.", 2); //message || duration
            return;
        }
        const payload = {
            accountType: selectedAccountType,
            currency: selectedCurrency,
            balance: parseFloat(balance)
        };
        try {
            const response = await axiosInstance.post("/accounts", payload);
            message.success("Account created successfully!", 2);
            //transfer new account upper component (AccountList Component)
            const created = response.data.account;
            created.account_type = payload.accountType;
            created.currency = payload.currency;
            created.balance = payload.balance;
            onAccountCreated(created);
            // clean form
            setSelectedAccountType(null);
            setSelectedCurrency(null);
            setBalance("");
        } catch (error) {
            message.error("Account creation failed.", 2);
        }
    }

    return (
        <div className="create-account-container  account-gp-design">
            <div className="back-button">
                <button onClick={onBack}>
                    <RollbackOutlined style={{ fontSize: "1.5rem", color: "#08c" }} />
                </button>
            </div>
            <div className="dropdown-container">
                <div className="dropdown-container-item">
                    <div className="dropdown-label">
                        <label>Account Type</label>
                    </div>
                    <div>
                        <Dropdown className="dropdown"
                                  menu={{ items: accountTypes, onClick: handleAccountTypeClick }}
                                  open={openAccountType}
                                  onOpenChange={(o) => setOpenAccountType(o)}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {selectedAccountType
                                        ? accountTypes.find(a => a.key === selectedAccountType)?.label
                                        : "Select"}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>

                </div>

                <div className="dropdown-container-item">
                    <div className="dropdown-label">
                        <label>Currency</label>
                    </div>
                    <div>
                        <Dropdown className="dropdown"
                                  menu={{ items: currencyTypes, onClick: handleCurrencyClick }}
                                  open={openCurrency}
                                  onOpenChange={(o) => setOpenCurrency(o)}
                        >
                            <a  onClick={(e) => e.preventDefault() }>
                                <Space>
                                    {selectedCurrency
                                        ? currencyTypes.find(c => c.key === selectedCurrency)?.label
                                        : "Select"}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div className="dropdown-container-item">
                    <label>Balance</label>
                    <input
                        type="number"
                        min={0}
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                </div>

            </div>
            <div className="confirm-button">
                <button onClick={handleAccountSave}>
                    Create
                </button>
            </div>

        </div>
    );
}

export default CreateAccount;
