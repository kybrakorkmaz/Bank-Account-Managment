import React from "react";
import ShowAccount from "./ShowAccount.jsx";
import CreateAccount from "./CreateAccount.jsx";
//todo fetch this from db
const data =[
    {
        id:1,
        name: "Time Deposit Account"
    },
    {
        id:2,
        name: "Demand Deposit"
    },
    {
        id:3,
        name: "Create Account"
    }
]

function AccountList() {
    const [accountClicked, setAccountClicked] = React.useState(false);
    const [accountInfo, setAccountInfo] = React.useState({
            id: "",
            name: "",
            amount: "",
            currency: ""
        }
    );
    const [isNewAccount, setIsNewAccount] = React.useState(false);
    function handleAccountButton(event){
        const selectedName = event.currentTarget.name;
        if(selectedName === "Create Account"){
            setIsNewAccount(true);
            setAccountClicked(true);
        }else{
            const selectedAccount = data.find(acc => acc.name === selectedName);
            // todo: sql query -> simulate account details
            setAccountInfo({
                id: selectedAccount.id,
                name: selectedAccount.name,
                amount: "10000", // demo data
                currency: "₺"
            });
            setIsNewAccount(false);
            setAccountClicked(true);
        }

    }
    //return back function
    function handleBack() {
        setAccountClicked(false);
        setIsNewAccount(false);
    }
    return (
        <>
            {!accountClicked ? (
                <div className={" account-gp-design"}> {/*Account General Page Design*/}
                    {data.map(acc => (
                        <button className="account-button" onClick={handleAccountButton} name={acc.name} key={acc.id}>
                            {acc.name}
                        </button>
                    ))}
                </div>
            ) : (!isNewAccount ? (<ShowAccount accountInfo={accountInfo} onBack={handleBack} />):
                <CreateAccount onBack={handleBack}/>)}
        </>
        );
}

export default AccountList;