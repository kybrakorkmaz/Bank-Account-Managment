import transferContext from "../Models/transferContext.js";
import {
    checkUserExist,
    getBalanceWithIban,
    getCurrency, isIbanBelongsToClient, updateBalanceWithIban, updateTransferTable
} from "../repositories/accountActionRepository.js";
import TransactionLogService from "./transactionLogService.js";
import transferTypeEnum from "../enum/transferTypeEnum.js";
import {getClientIdByEmail} from "../repositories/clientRepository.js";

const transfer_fee = 0.01;
const exchange_fee = 0.05;

class TransferService{

    createTransferObject(transferDetail){
        const {
            transferType,
            senderIban,
            receiverBank,
            receiverIban,
            exchangeFee,
            transferFee
        } = transferDetail;

        const amount = Number(transferDetail.amount);

        //console.log("Amount from body", amount);
        //console.log("Amount type", typeof amount);
        //console.log("Transfer type", transferType);

        return new transferContext(
            transferType,
            senderIban,
            receiverBank,
            receiverIban,
            amount,
            exchangeFee,
            transferFee
        );
    }
    async sendMoney(client, transferDetail){
        // create transfer object from the sender's request
        const transfer = this.createTransferObject(transferDetail);
        // IBAN validation
        const clientIdObj = await getClientIdByEmail(client.email);
        const clientId = clientIdObj.client_id;
        const isValidIban = await isIbanBelongsToClient(clientId, transfer.senderIban);
        if (!isValidIban) return "Selected IBAN does not belong to the authenticated user";
        // create transfer total amount variables
        let totalAmount = 0.00;
        let issuedExchangeFee = 0.00;
        let issuedTransferFee = 0.00;
        let isEFT =false;
        //check amount type
        //console.log("Send money function amount value", transfer.amount);
        //console.log("Type of", typeof transfer.amount);
        //check transfer type
        //console.log("Transfer type", transfer.transferType);
        if(transfer.transferType === transferTypeEnum.TRANSFER ||
            transfer.transferType === transferTypeEnum.VIRMAN){
            const checkReceiver =  await checkUserExist(transfer.receiverIban)
            if(!checkReceiver) return "There is no such that account, check IBAN";
        }
        else if(transfer.transferType === transferTypeEnum.EFT){
            issuedTransferFee = (transfer.amount *  transfer_fee);
            isEFT= true;
            //console.log("if-else statement issuedTransferFee", issuedTransferFee);
            //console.log("Type of", typeof issuedTransferFee);
        }
        //get currency
        const senderAccountCurr = (await getCurrency(transfer.senderIban)).currency;
        const receiverAccountCurr = isEFT ? null : (await getCurrency(transfer.receiverIban)).currency ; // null for EFT transaction
        // check currencies
        //console.log("sender account currency", senderAccountCurr);
        if(senderAccountCurr !== receiverAccountCurr && !isEFT){
            issuedExchangeFee = (transfer.amount * exchange_fee);
        }
       // console.log("issuedExchangeFee After sender account currency", issuedExchangeFee);
       // console.log("Type of", typeof issuedExchangeFee);
        totalAmount = issuedTransferFee + issuedExchangeFee + transfer.amount;
        transfer.transferFee = issuedTransferFee;
        transfer.exchangeFee = issuedExchangeFee;
        //console.log("Type of transfer fee and exchange fee", typeof transfer.transferFee, typeof transfer.exchangeFee);
        // get sender's balance
        //console.log("sender iban", transfer.senderIban);
        let counterpartyBalance =await getBalanceWithIban(transfer.senderIban);
        console.log("counterparty balance (sender side)", counterpartyBalance);
        console.log("Type of ", typeof counterpartyBalance);
        // if the source balance does not have enough money return warning
        if(counterpartyBalance < totalAmount) return "Balance is not enough!";
        // update sender account
        const senderBalance = (counterpartyBalance - totalAmount);
        console.log("transfer servis senderbalance", senderBalance);
        await updateBalanceWithIban(transfer.senderIban, senderBalance);
        //update receiver account
        counterpartyBalance = await getBalanceWithIban(transfer.receiverIban);
        console.log("counterpartyBalance", counterpartyBalance);
        const receiverBalance = Number(transfer.amount) + Number(counterpartyBalance);
        console.log("receiver balance", receiverBalance);
        await updateBalanceWithIban(transfer.receiverIban, receiverBalance);
        transfer.issuedTime = new Date();
        //insert transfer details into database
        await updateTransferTable(transfer);
        const transactionLogService = new TransactionLogService();
        //sender log
        let isSender = true;
        console.log("transfer type", transfer.transferType);
        if(transfer.transferType === transferTypeEnum.EFT ){ // different bank, no need to create a log into DB
            await transactionLogService.createEFTLog(transfer);
        }else if(transfer.transferType === transferTypeEnum.VIRMAN){ //inline transfer, no need to create a log into DB twice
            await transactionLogService.createVirmanLog(transfer);
        }else if(transfer.transferType === transferTypeEnum.TRANSFER){
            console.log("if-else transfer statement");
            await transactionLogService.createTransferLog(transfer, isSender); //transfer between two people in the same bank
        }
        //Create a receiver log
        if(transfer.transferType === transferTypeEnum.TRANSFER){
            isSender = false;
            await transactionLogService.createTransferLog(transfer, isSender);

        }
        //return success answer
        return { success: true, transfer };
    }
}

export default TransferService;