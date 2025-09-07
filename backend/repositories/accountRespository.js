import dbClient from "../config/databaseConfig.js";
import accountStatus from "../enum/accountStatus.js";
import Account from "../Models/account.js";

const getAccountID = async (clientIban) =>{
    try{
        console.log(clientIban);
        const result = await dbClient.query(`SELECT account_id FROM account where IBAN=$1`,[clientIban]);
        return result.rows[0]?.account_id || null;
    }catch (error){
        console.error("Client id db query error", error);
        throw error;
    }
}
const getAccountList = async (client)=>{
    try{
        const idResult = await dbClient.query(
            'SELECT client_id FROM client WHERE email=$1',
            [client.email]
        );
        const clientID = idResult.rows[0]?.client_id;
        console.log("client obj", client.email);
        console.log("clientID", clientID);
        const accResult = await dbClient.query(
            `SELECT * FROM account WHERE client_id = $1`,
            [clientID]
        );
        const accountList = accResult.rows; //return all accounts -> rows[0] return first account
        console.log("Account list:", accountList);
        return accountList;
    }catch(error){
        console.error("Database response error", error);
        throw error;
    }
}

const createAccount = async (client, accountInfo)=>{
    try{
        const {accountType, currency, balance} = accountInfo;
        const createdAt = new Date();
        const newAccount = new Account(
            accountType,
            currency,
            balance,
            createdAt,
            accountStatus.ACTIVE
        );
        const dbResult = await dbClient.query(
            `INSERT INTO account (
                     client_id, account_type,  balance, created_at, account_status, currency)
            VALUES(
                   (SELECT client_id FROM client WHERE email = $1),$2, $3, $4, $5, $6)
                RETURNING *`,
            [
                client.email,
                newAccount.accountType,
                newAccount.balance,
                newAccount.createdAt,
                newAccount.accountStatus,
                newAccount.currency]
        );
        return dbResult.rows[0];
    }catch(error){
        console.error("Account creation error:", error);
        throw error;
    }
}

const deleteAccount = async (accountId) => {
    try {
        const result = await dbClient.query(
            `UPDATE account
               SET account_status = $1
               WHERE account_id = $2
               RETURNING *`,
            [accountStatus.PASSIVE, accountId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Account deletion error:", error);
        throw error;
    }
};

export {getAccountID, getAccountList, createAccount, deleteAccount};