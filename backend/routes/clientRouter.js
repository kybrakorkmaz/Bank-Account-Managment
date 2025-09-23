import express from "express";
import Client from "../models/client.js";
import {checkCredentials, loginClient, logoutClient, refreshAccessToken} from "../services/clientService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log("Login endpoint hit");
    const { email, password } = req.body;
    const clientObj = new Client(email, password);

    try {
        const response = await loginClient(clientObj);
        console.log("Auth response:", response);
        if (!response.success) {
            if (response.reason === "NOT_FOUND") {
                return res.status(404).json({ message: "Client not found" });
            }
            if (response.reason === "WRONG_PASSWORD") {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }
        return res.status(200).json({
            message: "Logged in successfully",
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/refresh", async (req,res)=>{
    const {refreshToken} = req.body;
    if(!refreshToken) return res.status(400).json({message: "Missing refresh token"});
    const result = await refreshAccessToken(refreshToken);
    if(!result.success){
        return res.status(403).json({message: "Invalid or expired refresh token"});
    }
    return res.status(200).json({ accessToken: result.accessToken });
})

router.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Missing refresh token" });

    const result = await logoutClient(refreshToken);
    if (!result.success) {
        return res.status(500).json({ message: "Failed to revoke token" });
    }

    return res.status(200).json({ message: "Logged out successfully" });
});
export default router;
