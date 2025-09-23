import Address from "../models/address.js";
import dbClient from "../config/databaseConfig.js";
import {getClientIdByEmail} from "../repositories/clientRepository.js";
import {
    deleteAddressById,
    findAddressesByClientId,
    insertAddressForClient,
    updateAddressById
} from "../repositories/addressRepository.js";

const getClientAddresses = async (clientEmail) => {
    const clientId = await getClientIdByEmail(clientEmail);
    if (!clientId) return [];
    return await findAddressesByClientId(clientId);
};

const addClientAddress = async (clientEmail, addressDetail) => {
    const clientId = await getClientIdByEmail(clientEmail);
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

const updateClientAddressById = async (clientEmail, addressId, updateFields) => {
    const clientId = await getClientIdByEmail(clientEmail);
    if (!clientId) throw new Error("Client not found");

    const normalizeKeys = {
        addressType: "address_type",
        country: "country",
        city: "city",
        state: "state",
        district: "district",
        street: "street",
        others: "others"
    };

    const normalizedFields = {};
    for (const key in updateFields) {
        const mappedKey = normalizeKeys[key];
        if (mappedKey) {
            normalizedFields[mappedKey] = updateFields[key];
        }
    }

    return await updateAddressById(clientId, addressId, normalizedFields);
};

const removeAddressById = async (addressId, email) => {
    const clientId = await getClientIdByEmail(email);
    if (!clientId) throw new Error("Client not found");
    return await deleteAddressById(clientId, addressId);
};

export {
    getClientAddresses,
    addClientAddress,
    updateClientAddressById,
    removeAddressById
};
