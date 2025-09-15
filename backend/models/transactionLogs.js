class TransactionLogs {
    constructor( transactionType, counterpartyIban, actionTime) {
        this.transactionType = transactionType;
        this.counterpartyIban = counterpartyIban;
        this.actionTime = actionTime;
    }
}
export default TransactionLogs;