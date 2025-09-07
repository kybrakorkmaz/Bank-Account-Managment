// settingsService.js
import bcrypt from "bcrypt";
import {getClientInfoByID} from "../repositories/clientRepository.js";


const getSettings = async (clientId) => {
    return await getClientInfoByID(clientId);
};

const updateSettings = async (clientId, { email, phone, password, confirmPassword }) => {
    if (password && password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const updated = await updateSettings(clientId, email, phone);

    if (password) {
        const hashed = await bcrypt.hash(password, 10);
        await updatePasswordRepo(clientId, hashed);
    }

    return updated;
};

export { getSettings, updateSettings };
