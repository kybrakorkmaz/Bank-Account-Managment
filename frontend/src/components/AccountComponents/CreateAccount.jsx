import React, { useState } from "react";
import { DownOutlined, RollbackOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

// Vadeli / Vadesiz seçenekleri
const accountTypes = [
    { label: "Time deposit account", key: "Time deposit account" },
    { label: "Demand deposit", key: "Demand deposit" }
];

// Para birimi seçenekleri
const currencyTypes = [
    { label: "Turkish Lira (₺)", key: "TL" },
    { label: "Dollar ($)", key: "USD" },
    { label: "Euro (€)", key: "EUR" },
    { label: "Gold (Gr)", key: "GOLD" }
];

function CreateAccount({ onBack }) {
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [openAccountType, setOpenAccountType] = useState(false);
    const [openCurrency, setOpenCurrency] = useState(false);

    const handleAccountTypeClick = (e) => {
        setSelectedAccountType(e.key);
        setOpenAccountType(false);
    };

    const handleCurrencyClick = (e) => {
        setSelectedCurrency(e.key);
        setOpenCurrency(false);
    };

    function handleAccountSave() {
        console.log("save button clicked!");
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
