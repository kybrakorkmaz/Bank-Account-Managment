CREATE TABLE Client (
    client_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
	password_ VARCHAR(100) NOT NULL,
    citizen_id CHAR(11) UNIQUE NOT NULL,
    phone_no VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE NOT NULL
);

CREATE TABLE Address (
    address_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    address_type VARCHAR(50) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state_ VARCHAR(255) NOT NULL,
    district VARCHAR(255),
    street VARCHAR(255) NOT NULL,
    others_ VARCHAR(255),
    FOREIGN KEY (client_id) REFERENCES Client(client_id)
);

CREATE TABLE Auth_Tokens (
    token_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    token_type VARCHAR(50) NOT NULL,
    token_value VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id)
);

CREATE TABLE Account (
    account_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    account_type VARCHAR(255) NOT NULL,
	IBAN VARCHAR(34) UNIQUE NOT NULL,
    balance DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    account_status VARCHAR(20) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id)
);

CREATE TABLE Transaction_Logs (
    log_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    counterparty_iban VARCHAR(34) NOT NULL, -- receiver/sender
    action_type VARCHAR(50) NOT NULL, -- Exchange/Transfer
    action_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

CREATE TABLE Transfer (
    transfer_id SERIAL PRIMARY KEY,
	sender_account_id INT NOT NULL,
	reciever_account_id INT, -- opsiyonel
	transfer_type VARCHAR(50), -- EFT/HAVALE/HESAPLAR ARASI
    reciever_iban VARCHAR(34) NOT NULL,
    reciever_bank_name VARCHAR(255),  
	amount DECIMAL(18,2) NOT NULL,
    exchange_fee DECIMAL(10,2),
	transfer_fee DECIMAL(10,2),
    issued_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (sender_account_id) REFERENCES Account(account_id),
	FOREIGN KEY (reciever_account_id) REFERENCES Account(account_id)
);


