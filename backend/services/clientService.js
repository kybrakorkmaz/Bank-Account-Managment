import { getCredentials } from "../repositories/clientRepository.js";
import bcrypt from "bcrypt";

const checkCredentials = async (credentials) => {
    const result = await getCredentials(credentials);
    if (!result) {
        return { success: false, reason: "NOT_FOUND" };
    }
    const match = await bcrypt.compare(credentials.password, result.password_);
    if (!match) {
        return { success: false, reason: "WRONG_PASSWORD" };
    }
    return { success: true, client: result };
};

export { checkCredentials };
