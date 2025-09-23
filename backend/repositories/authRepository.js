import dbClient from "../config/databaseConfig.js";

const storeToken = async(clientId, type, tokenValue, durationMs)=>{
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMs);
    await dbClient.query(`
    INSERT INTO auth_tokens (client_id, token_type, token_value, expires_at, revoked, created_at)
    VALUES($1, $2, $3, $4, $5, $6)`,
        [clientId, type, tokenValue, expiresAt, false, now]);

};

const findValidToken = async (clientId, tokenValue)=>{
    const result = await dbClient.query(`
    SELECT * FROM auth_tokens
    WHERE client_id=$1 AND token_value=$2 AND revoked =false AND expires_at > NOW()`,
        [clientId, tokenValue]);
    return result.rows[0];
}
const revokeToken = async (tokenValue) => {
    try {
        await dbClient.query(
            `UPDATE auth_tokens SET revoked = true WHERE token_value = $1`,
            [tokenValue]
        );
    } catch (error) {
        console.error("Token revoke error:", error);
        throw error;
    }
};


export {storeToken, findValidToken, revokeToken};