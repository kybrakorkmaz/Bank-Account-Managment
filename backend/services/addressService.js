import Address from "../models/address.js";
import dbClient from "../config/databaseConfig.js";
import {getClientIdByEmail} from "../repositories/clientRepository.js";
import {findAddressesByClientId, insertAddressForClient} from "../repositories/addressRepository.js";

const getClientAddresses = async (client) => {
    const clientId = await getClientIdByEmail(client.email);
    if (!clientId) return [];
    return await findAddressesByClientId(clientId);
};

const addClientAddress = async (client, addressDetail) => {
    const clientId = await getClientIdByEmail(client.email);
    if (!clientId) throw new Error("Client not found");

    const addressObj = new Address(
        addressDetail.addressType,
        addressDetail.country,
        addressDetail.city,
        addressDetail.state,
        addressDetail.district,
        addressDetail.street,
        addressDetail.others
    );

    return await insertAddressForClient(clientId, addressObj);
};

const updateClientAddressById = async (client, addressId, updateFields) => {
    const allowedFields = ["addressType", "country", "city", "state", "district", "street", "others"];
    const keys = Object.keys(updateFields).filter(key => allowedFields.includes(key));
    if (keys.length === 0) throw new Error("No valid fields to update");

    const setClause = keys
        .map((key, i) => `${key === "others" || key === "state" ? key + "_" : key} = $${i + 1}`)
        .join(", ");

    const values = keys.map(key => updateFields[key]);
    const query = `UPDATE address SET ${setClause} WHERE address_id = $${keys.length + 1} RETURNING *`;
    const params = [...values, addressId];

    const result = await dbClient.query(query, params);
    return result.rows[0];
};

const removeAddressById = async (addressId) => {
    const result = await dbClient.query(
        `DELETE FROM address WHERE address_id = $1 RETURNING *`,
        [addressId]
    );
    return result.rows[0];
};

export {
    getClientAddresses,
    addClientAddress,
    updateClientAddressById,
    removeAddressById
};
