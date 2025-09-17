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

const updateAddressById = async (clientId, addressId, updateFields) => {
    try {
        const allowedFields = [
            "address_type", "country", "city", "state", "district", "street", "others"
        ];

        const keys = Object.keys(updateFields).filter(key => allowedFields.includes(key));
        if (keys.length === 0) return null;

        const setClause = keys
            .map((key, i) => `${key === "others" || key === "state" ? key + "_" : key} = $${i + 1}`)
            .join(", ");

        const values = keys.map(key => updateFields[key]);
        const query = `
              UPDATE address
              SET ${setClause}
              WHERE address_id = $${keys.length + 1} AND client_id = $${keys.length + 2}
              RETURNING *`;

        const params = [...values, addressId, clientId];
        const result = await dbClient.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error("Repository error:", error);
        throw error;
    }
};

const deleteAddressById = async (clientId, addressId) => {
    try {
        const result = await dbClient.query(
            `DELETE FROM address WHERE address_id = $1 AND client_id = $2 RETURNING *`,
            [addressId, clientId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Repository delete error:", error);
        throw error;
    }
};


export {
    findAddressesByClientId,
    insertAddressForClient,
    updateAddressById,
    deleteAddressById
};
