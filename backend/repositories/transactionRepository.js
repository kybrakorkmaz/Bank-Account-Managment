import dbClient from "../config/databaseConfig.js";

const getTransaction = async (email)=>{
    try{
        const result = await dbClient.query("" +
            `SELECT
              tl.action_type,
              tl.counterparty_iban,
              t.amount,
              tl.action_time
            FROM transaction_logs tl
            JOIN transfer t ON tl.counterparty_iban = t.reciever_iban
            JOIN account a ON tl.account_id = a.account_id
            JOIN client c ON a.client_id = c.client_id
            WHERE c.email = $1
            ORDER BY tl.action_time DESC;
            `, [email]);
        return result.rows;
    }catch (error){
        console.error("Transaction log query error", error);
    }
}

export {getTransaction}