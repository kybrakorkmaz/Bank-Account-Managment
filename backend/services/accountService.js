import {updateAccountTable} from "../repositories/accountRespository.js";
import dbClient from "../config/databaseConfig.js";
import accountStatus from "../enum/accountStatus.js";
import Account from "../models/account.js";
import client from "../models/client.js";

function generateRandomTurkishIBAN() {
    const countryCode = "TR"; // 2
    const checkDigits = "00"; // 2
    const bankCode = Math.floor(10000 + Math.random() * 90000).toString(); // 5
    const branchCode = Math.floor(Math.random() * 10).toString(); // 1
    const accountNumber = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(""); // 16
    return `${countryCode}${checkDigits}${bankCode}${branchCode}${accountNumber}`; // 26 karakter
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