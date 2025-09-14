import dbClient from "../config/databaseConfig.js";

const findAddressesByClientId = async (clientId) => {
    try{
        const result = await dbClient.query(
            `SELECT * FROM address WHERE client_id = $1`,
            [clientId]
        );
        return result.rows;
    }catch (error){
        throw error;
    }
};

const insertAddressForClient = async (clientId, address) => {
    try{
        const result = await dbClient.query(
            `INSERT INTO address (
              client_id, address_type, country, city, state_, district, street, others_
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                clientId,
                address.addressType,
                address.country,
                address.city,
                address.state,
                address.district,
                address.street,
                address.others
            ]
        );
        return result.rows[0];
    }catch (error){
        throw error;
    }
};

export {
    findAddressesByClientId,
    insertAddressForClient
};
