import React from "react";
import {RollbackOutlined} from "@ant-design/icons";


function ShowAccount(props) {

    return(
        <div className="show-account  account-gp-design">
            <div className="back-button">
                <button onClick={props.onBack}><RollbackOutlined style={{ fontSize: '1.5rem', color: '#08c' }}  /></button>
            </div>
            <div className="account-info">
                <h3>{props.accountInfo.name}</h3>
                <p>{props.accountInfo.iban}</p>
                <p>{props.accountInfo.amount}</p>
            </div>
        </div>
    );
}

export default ShowAccount;