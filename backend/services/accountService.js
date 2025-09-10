import {updateAccountTable} from "../repositories/accountRespository.js";
import dbClient from "../config/databaseConfig.js";
import accountStatus from "../enum/accountStatus.js";
import Account from "../Models/account.js";
import client from "../Models/client.js";

function generateRandomTurkishIBAN() {
    const countryCode = "TR";
    const checkDigits = "00";
    const bankCode = Math.floor(1000 + Math.random() * 9000).toString();
    const accountNumber = Array.from({ length: 16 },
        () => Math.floor(Math.random() * 10)).join("");

    return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
}

const createAccount = async (email, accountProp)=>{
    const {accountType, currency, balance} = accountProp;
    if (!accountType || !currency || balance == null) {
        throw new Error("Missing account parameters");
    }
    const createdAt = new Date();
    const iban = generateRandomTurkishIBAN();
    const newAccount = new Account(
        accountType,
        iban,
        currency,
        balance,
        createdAt,
        accountStatus.ACTIVE
    );
    const created = await updateAccountTable(email, newAccount);
    return { success: "200", account: created };
}

export {createAccount};