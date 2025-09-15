class Account{
    constructor(accountType, iban, currency, balance, createdAt, status){
        this.accountType = accountType;
        this.iban = iban;
        this.currency = currency;
        this.balance = balance;
        this.createdAt = createdAt;
        this.accountStatus = status;
    }
}
export default Account;