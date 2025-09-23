import express from "express";
import TransferService from "../services/transferService.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/transfer", verifyToken, async (req, res) => {
    const client = req.client; // JWT'den gelen payload
    const transferService = new TransferService();

    if (!client || !client.client_id) {
        return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }
    const transferCtx = req.body;
    if (!transferCtx || Object.keys(transferCtx).length === 0) {
        return res.status(400).json({ message: "Empty Request" });
    }
    console.log(transferCtx);
    try {
        const transferAction = await transferService.sendMoney(client, transferCtx);

        if (!transferAction) {
            return res.status(400).json({ message: "Transfer could not be completed. Please check your balance or receiver information." });
        }
        console.log(transferAction);
        return res.status(200).json({ message: "Transfer successfully completed" });
    } catch (error) {
        console.error("Transfer post router error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export default router;