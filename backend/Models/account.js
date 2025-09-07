class Account{
    //TODO CREATE IBAN COLUMN
    constructor(accountType, currency, balance, createdAt, status){
        this.accountType = accountType;
        this.currency = currency;
        this.balance = balance;
        this.createdAt = createdAt;
        this.accountStatus = status;
    }
}
export default Account;