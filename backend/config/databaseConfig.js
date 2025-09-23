import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();
/** @type {import('pg').Client} */
const dbClient = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD);
console.log('DB_NAME type:', typeof process.env.DB_NAME, process.env.DB_NAME);
export default dbClient;
