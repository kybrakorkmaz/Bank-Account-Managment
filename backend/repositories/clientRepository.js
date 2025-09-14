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
const getClientIdByEmail = async (email) => {
    try {
        const result = await dbClient.query(
            'SELECT client_id FROM client WHERE email = $1',
            [email]
        );
        return result.rows[0]?.client_id ?? null;
    } catch (error) {
        console.error("Database error", error);
        throw error;
    }
};



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
        const fields = [];
        const values = [];
        let index = 1;
        // UPDATE client SET email=$1, phone_no=$2, password=$3, WHERE client_id=$4
        if (email !== null) {
            fields.push(`email = $${index++}`); //index=1
            values.push(email);
        }
        if (phone !== null) {
            fields.push(`phone_no = $${index++}`); //index=2
            values.push(phone);
        }
        if (password !== null) {
            fields.push(`password_ = $${index++}`); //index=3
            values.push(password);
        }

        if (fields.length === 0) {
            return null;
        }

        values.push(clientId);

        const query = `
            UPDATE client
            SET ${fields.join(", ")}
            WHERE client_id = $${index}
            RETURNING email, phone_no`;

        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("update client info query error for settings", error);
        throw error;
    }
};

export {getCredentials, getClientIdByEmail,getClientInfoByID, updateClientInfoByID};