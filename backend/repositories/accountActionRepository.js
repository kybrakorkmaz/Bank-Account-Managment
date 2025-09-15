import dbClient from "../config/databaseConfig.js";
import {getAccountID} from "./accountRespository.js";

const getBalanceWithIban = async(accountIban)=>{
    try{
        const result = await dbClient.query(`SELECT balance FROM account WHERE IBAN=$1`, [accountIban]);
        console.log("balance", result.rows[0]?.balance);
        return result.rows[0]?.balance;
    }catch (error){
        console.error("get balance db query error", error);
       throw error;
    }
}
const getCurrency= async(accountIban)=>{
    try{
        const result = await dbClient.query(`SELECT currency FROM account WHERE IBAN=$1`, [accountIban]);
        return result.rows[0]?.currency;
    }catch (error){
        console.error("Get currency db query error", error);
       throw error;
    }
}
const updateBalanceWithIban = async (accountIban, balance)=>{
    try{
        await dbClient.query(`UPDATE account SET balance=$1 WHERE IBAN=$2`, [balance, accountIban]);
    }catch (error){
        console.error("Update balance db query error", error);
        throw  error;
    }
}
const checkUserExist = async (receiverIban)=>{
    try{
        const isExist = await dbClient.query(`SELECT account_id FROM account WHERE IBAN = $1`, [receiverIban]);
        if (isExist.rows.length > 0) return true; //exist
        return false; //not exist
    }catch (error){
        console.error("Check user db query error", error);
        throw  error;
    }
}
const updateTransferTable= async (transfer)=>{
    try{
        const queryParams =`INSERT INTO transfer(
                     sender_account_id,
                     reciever_account_id,
                     transfer_type,
                     reciever_iban,
                     reciever_bank_name,
                     amount,
                     exchange_fee,
                     transfer_fee ,
                     issued_time)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        console.log("sender iban", transfer.senderIban);
        console.log("receiver iban", transfer.receiverIban);
        const senderAccountID = await getAccountID(transfer.senderIban);
        //console.log("sender account id", senderAccountID);
        const receiverAccountID = await  getAccountID(transfer.receiverIban);
        //console.log("receiver account id", receiverAccountID);

        const queryValues = [
            senderAccountID,
            receiverAccountID,
            transfer.transferType,
            transfer.receiverIban,
            transfer.receiverBank,
            transfer.amount,
            transfer.exchangeFee,
            transfer.transferFee,
            transfer.issuedTime];

        await dbClient.query(queryParams, [...queryValues]);
    }catch (error){
        console.error("Update transfer table db query error", error);
        throw error;
    }
}
const updateTransactionTable= async (accountId, transactionLog)=>{
    try{
        console.log("update table query account id", accountId);
        const queryParam = `INSERT INTO transaction_logs (account_id, counterparty_iban,  action_type, action_time)
        VALUES($1, $2, $3, $4)`;
        const queryValues = [
            accountId,
            transactionLog.counterpartyIban,
            transactionLog.transactionType,
            transactionLog.actionTime];
        await dbClient.query(queryParam, [...queryValues]);
    }catch (error){
        console.error("Update transaction table query error", error);
        throw error;
    }
}
const isIbanBelongsToClient = async (clientId, iban) =>{
    const result = await dbClient.query(
        `SELECT 1 FROM account WHERE client_id = $1 AND IBAN = $2`,
        [clientId, iban]
    );
    return result.rowCount > 0;
}
export {getBalanceWithIban,
    getCurrency,
    updateBalanceWithIban,
    checkUserExist,
    updateTransferTable,
    updateTransactionTable,
    isIbanBelongsToClient};