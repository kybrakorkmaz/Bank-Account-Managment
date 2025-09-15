class TransferContext {
    constructor(transferType, senderIban, receiverBank, receiverIban, amount, exchangeFee, transferFee, issuedTime) {
        this.transferType = transferType;
        this.senderIban = senderIban;
        this.receiverBank = receiverBank || null;
        this.receiverIban = receiverIban;
        this.amount = amount;
        this.exchangeFee = exchangeFee;
        this.transferFee = transferFee;
        this.issuedTime = issuedTime || new Date();
    }
}

export default TransferContext;