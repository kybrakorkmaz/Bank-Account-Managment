import dbClient from "../config/databaseConfig.js";

const getCredentials = async (credentials) => {
    try {
        const result = await dbClient.query(
            'SELECT email, password_ FROM client WHERE email = $1',
            [credentials.email]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Database error", error);
        throw error;
    }
};
const getClientIdByEmail = async (email)=>{
    try {
        const result = await dbClient.query(
            'SELECT client_id FROM client WHERE email = $1',
            [email]
        );
        return result.rows[0]?.client_id || null;
    } catch (error) {
        console.error("Database error", error);
        throw error;
    }
}


const getClientInfoByID = async (clientId) => {
    try {
        const result = await dbClient.query(
            `SELECT email, phone_number FROM client WHERE client_id = $1`,
            [clientId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("get client info query error for settings", error);
        throw error;
    }
};

const updateClientInfoByID = async (clientId, email, phone, password) => {
    try {
        const result = await dbClient.query(
            `UPDATE client
             SET email = $1,
                 phone_no = $2,
                 password_ = $3
             WHERE client_id = $4 RETURNING email, phone_no`,
            [email, phone, password, clientId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("update client info query error for settings", error);
        throw error;
    }
}
export {getCredentials, getClientIdByEmail,getClientInfoByID, updateClientInfoByID};