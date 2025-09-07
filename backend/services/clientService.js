import { getCredentials } from "../repositories/clientRepository.js";

const checkCredentials = async (credentials) => {
    const result = await getCredentials(credentials);
    if (!result) {
        return { success: false, reason: "NOT_FOUND" };
    }
    if (result.password_ !== credentials.password) {
        return { success: false, reason: "WRONG_PASSWORD" };
    }
    return { success: true, client: result };
};

export { checkCredentials };
