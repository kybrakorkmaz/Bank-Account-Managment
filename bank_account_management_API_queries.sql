-- INSERT CLIENT
INSERT INTO Client (
    username, 
	password_,
    citizen_id, 
    phone_no, 
    email, 
    dob
)
VALUES (
    'Kubra Korkmaz', 
	'123456',
    '01234567892', 
    '+905001112233', 
    'user@mail.com', 
    '1999-11-12'
);
-- INSERT CLIENT
INSERT INTO Client (
    username, 
	password_,
    citizen_id, 
    phone_no, 
    email, 
    dob
)
VALUES (
    'John Doe', 
	'123456',
    '11234567892', 
    '+905001112244', 
    'user2@mail.com', 
    '1999-11-12'
);
-- INSERT ADDRESSES --

INSERT INTO Address (
    client_id,
    address_type,
    country,
    city,
    state_,
    district,
    street,
    others_
)
VALUES (
    (SELECT client_id FROM Client WHERE username = 'Kubra Korkmaz'),
    'Home',
    'Turkey',
    'Eskişehir',
    'Odunpazarı',
    'Büyükdere',
    '26',
    NULL
);
-- DEPOSIT ACCOUNT
INSERT INTO Account (
    client_id,
    account_type,
    IBAN,
    balance,
    account_status,
    currency
)
VALUES (
    (SELECT client_id FROM Client WHERE username = 'Kubra Korkmaz'),
    'deposit',
    'TR760006100519786457841326',
    10000.00,
    'ACTIVE',
    'TRY'
);

-- LOAN ACCOUNT
INSERT INTO Account (
    client_id,
    account_type,
    IBAN,
    balance,
    account_status,
    currency
)
VALUES (
    (SELECT client_id FROM Client WHERE username = 'Kubra Korkmaz'),
    'loan',
    'TR760006100519786457841327',
    5000.00,
    'ACTIVE',
    'TRY'
);

-- DEPOSIT ACCOUNT
INSERT INTO Account (
    client_id,
    account_type,
    IBAN,
    balance,
    account_status,
    currency
)
VALUES (
    (SELECT client_id FROM Client WHERE username = 'John Doe'),
    'deposit',
    'TR760006100519786457841330',
    10000.00,
    'ACTIVE',
    'TRY'
);

