// settingsService.js
import bcrypt from "bcrypt";
import {getClientInfoByID, updateClientInfoByID} from "../repositories/clientRepository.js";


const getSettings = async (clientId) => {
    const result =await getClientInfoByID(clientId);
    console.log("get settings result", result);
    return result;
};


const updateSettings = async (clientId, clientInfo) => {
    const email = clientInfo.email || null;
    const phone = clientInfo.phone || null;
    const password = clientInfo.password || null;
    const confirmPassword = clientInfo.confirmPassword || null;

    if (password !== null || confirmPassword !== null) {
        if (!password || !confirmPassword) {
            throw new Error("Both password and confirm password must be filled!");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await updateClientInfoByID(clientId, email, phone, hashedPassword);
    }

    return await updateClientInfoByID(clientId, email, phone, null);
};




export { getSettings, updateSettings };
