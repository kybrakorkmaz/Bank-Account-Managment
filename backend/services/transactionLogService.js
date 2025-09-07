import TransactionLogs from "../Models/transactionLogs.js";
import transactionTypeEnum from "../enum/transactionTypeEnum.js";
import {updateTransactionTable} from "../repositories/accountActionRepository.js";
import {getAccountID} from "../repositories/accountRespository.js";

class TransactionLogService{
    async createEFTLog(transferDetail) {
        const accountId = await getAccountID(transferDetail.senderIban);
        console.log("account id", accountId);
        const transactionLog = new TransactionLogs(
            transactionTypeEnum.TRANSFER_OUT,
            transferDetail.receiverIban,
            transferDetail.issuedTime
        );
        await updateTransactionTable(accountId, transactionLog);
    }

    async createVirmanLog(transferDetail){
        const accountId = await getAccountID(transferDetail.senderIban);
        console.log("account id", accountId);
        const transactionLog = new TransactionLogs(
            transactionTypeEnum.INLINE_TRANSFER,
            transferDetail.receiverIban,
            transferDetail.issuedTime
        );
        await updateTransactionTable(accountId, transactionLog);
    }
    async createTransferLog(transferDetail, isSender){
        console.log("Hello transfer log");
        const accountIban = isSender ? transferDetail.senderIban : transferDetail.receiverIban;
        const counterpartyIban = isSender ? transferDetail.receiverIban : transferDetail.senderIban;
        const actionType = isSender ? transactionTypeEnum.TRANSFER_OUT : transactionTypeEnum.TRANSFER_IN;
        const actionTime = transferDetail.issuedTime;
        const accountId = await getAccountID(accountIban);
        console.log("account id", accountId);
        console.log("sender", isSender);
        const transactionLog = new TransactionLogs(
            actionType,
            counterpartyIban,
            actionTime
        );

        await updateTransactionTable(accountId, transactionLog);
    }
}

export default TransactionLogService;