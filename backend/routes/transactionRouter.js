import express from "express";
import {getTransaction} from "../repositories/transactionRepository.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/transaction", verifyToken, async (req, res) => {
    //const clientSession = req.session.client;
    const clientEmail = req.client?.email;
    const logs = await getTransaction(clientEmail);

    if (!logs || logs.length === 0) {
        return res.status(404).json({ message: "No transaction found", logs: [] });
    }

    return res.status(200).json({ message: "success", logs });
});

export default router;