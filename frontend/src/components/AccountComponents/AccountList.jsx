import React, {useEffect, useState} from "react";
import ShowAccount from "./ShowAccount.jsx";
import CreateAccount from "./CreateAccount.jsx";
import axiosInstance from "../../api/axiosInstance.js";

function AccountList() {
    const [accountClicked, setAccountClicked] = useState(false);
    const [accountInfo, setAccountInfo] = useState({
            name: "",
            iban: "",
            amount: "",
            currency: ""
        }
    );
    const [isNewAccount, setIsNewAccount] = useState(false);
    const [accountList, setAccountList] = useState([]);
    //update list after created an account
    function handleAccountCreated(newAccount) {
        setAccountList(prev => [...prev, newAccount]);
    }

    async function fetchAccounts() {
        try {
            const response = await axiosInstance.get("/accounts");
            setAccountList(response.data.accounts);
        } catch (error) {
            console.error("Accounts fetch error", error);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    function handleAccountButton(event){
        const selectedId = Number(event.currentTarget.dataset.id);
        console.log(selectedId);
        if (!selectedId) {
            setIsNewAccount(true);
            setAccountClicked(true);
            return;
        }
        const selectedAccount = accountList.find(acc => acc.account_id === selectedId);
        console.log(selectedAccount);
        if (selectedAccount) {
            const accountType = selectedAccount.account_type.charAt(0).toUpperCase() + selectedAccount.account_type.slice(1);
            const accountName = `${selectedAccount.currency} ${accountType}`;
            console.log(accountName);
            setAccountInfo({
                name: accountName,
                iban: selectedAccount.iban,
                amount: selectedAccount.balance,
                currency: selectedAccount.currency
            });
            console.log(accountInfo);
            setIsNewAccount(false);
            setAccountClicked(true);
        }

    }
    //return back function
    function handleBack() {
        setAccountClicked(false);
        setIsNewAccount(false);
        fetchAccounts(); // yeni listeyi çek
    }

    return (
        <>
            {!accountClicked ? (
                <div className="account-gp-design">
                    {accountList.map(acc => {
                        const accountType = acc.account_type.charAt(0).toUpperCase() + acc.account_type.slice(1);
                        const accountName = `${acc.currency} ${accountType}`;

                        return (
                            <button
                                className="account-button"
                                onClick={handleAccountButton}
                                data-id={acc.account_id}
                                key={acc.account_id}
                            >
                                {accountName}
                            </button>
                        );
                    })}
                    <button
                        className="account-button"
                        onClick={handleAccountButton}
                        name="Create Account"
                        key="create-account"
                    >
                        Create Account
                    </button>
                </div>
            ) : (!isNewAccount ? (<ShowAccount accountInfo={accountInfo} onBack={handleBack} />):
                <CreateAccount onBack={handleBack} onAccountCreated={handleAccountCreated} />)}
        </>
        );
}

export default AccountList;