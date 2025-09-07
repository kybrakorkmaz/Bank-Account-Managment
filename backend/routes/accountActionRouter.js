import express from "express";
import TransferService from "../services/transferService.js";

const router = express.Router();

router.post("/transfer", async (req, res) => {
    const clientSession = req.session.client;
    const transferService = new TransferService();
    if (!clientSession || !clientSession.email) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }
    const transferCtx = req.body;
    if (!transferCtx || Object.keys(transferCtx).length === 0) {
        return res.status(400).json({ message: "Empty Request" });
    }
    try {
        const transferAction = await transferService.sendMoney(clientSession, transferCtx);

        if (!transferAction) {
            return res.status(400).json({ message: "Transfer could not be completed. Please check your balance or receiver information." });
        }

        return res.status(200).json({ message: "Transfer successfully completed" });
    } catch (error) {
        console.error("Transfer post router error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export default router;