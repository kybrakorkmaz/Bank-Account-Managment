import pg from 'pg';

/** @type {import('pg').Client} */
const dbClient = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Bank_Account_Management',
    password: '123456',
    port: 5432,
});

export default dbClient;
