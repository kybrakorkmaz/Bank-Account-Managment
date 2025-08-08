import React from "react";
import {RollbackOutlined} from "@ant-design/icons";


function ShowAccount(props) {

    return(
        <div className="show-account  account-gp-design">
            {/* 👇 geri dönüş butonu */}
            <div className="back-button">
                <button onClick={props.onBack}><RollbackOutlined style={{ fontSize: '1.5rem', color: '#08c' }}  /></button>
            </div>
            <div className="account-info">
                <h3>{props.accountInfo.name}</h3>
                <p>ID: {props.accountInfo.id}</p>
                <p>IBAN: XXXXXXXX</p>
                <p>Bakiye: {props.accountInfo.amount} {props.accountInfo.currency}</p>
            </div>
        </div>
    );
}

export default ShowAccount;