import {getClientIdByEmail, getCredentials} from "../repositories/clientRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {findValidToken, revokeToken, storeToken} from "../repositories/authRepository.js";

const JWT_SECRET = "dev-access-secret";
const JWT_REFRESH_SECRET = "dev-refresh-secret";

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

const loginClient = async(credentials)=>{
    const result = await getCredentials(credentials);
    if(!result) return {success: false, reason: "NOT_FOUND"};
    const match = await bcrypt.compare(credentials.password, result.password_);
    if(!match) return {success: false, reason: "WRONG_PASSWORD"};
    const clientId = await getClientIdByEmail(result.email);
    const payload = {
        client_id: clientId,
        email: result.email
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15m",
        issuer: "dev-app"
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
        issuer: "dev-app"
    });

    await storeToken (clientId, "refresh", refreshToken, 7*24*60*60*1000);
    return {success: true, accessToken, refreshToken};
}

const refreshAccessToken = async (refreshToken)=>{
    try{
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const tokenRecord = await findValidToken(decoded.client_id, refreshToken);
        if(!tokenRecord || tokenRecord.revoked) return {success: false,  reason: "INVALID_TOKEN"};
        const payload = {client_id: decoded.client_id, email: decoded.email};
        const newAccessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "15m",
            issuer: "dev-app"
        });
        return {success: true, accessToken: newAccessToken};
    }catch (error){
        return {success: false, reason: "EXPIRED_OR_INVALID"};
    }
}
const logoutClient = async (refreshToken) => {
    try {
        await revokeToken(refreshToken);
        return { success: true };
    } catch (error) {
        return { success: false, reason: "REVOKE_FAILED" };
    }
};

export { checkCredentials, loginClient, refreshAccessToken, logoutClient };
