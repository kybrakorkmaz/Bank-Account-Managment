class TransactionLogs {
    constructor( transactionType, counterparty_iban, actionTime) {
        this.transactionType = transactionType;
        this.counterparty_iban = counterparty_iban;
        this.actionTime = actionTime;
    }
}
export default TransactionLogs;