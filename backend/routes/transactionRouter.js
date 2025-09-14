import express from "express";
import {getTransaction} from "../repositories/transactionRepository.js";

const router = express.Router();

router.get("/transaction", async (req, res) => {
    const clientSession = req.session.client;
    const logs = await getTransaction(clientSession.email);

    if (!logs || logs.length === 0) {
        return res.status(404).json({ message: "No transaction found", logs: [] });
    }

    return res.status(200).json({ message: "success", logs });
});

export default router;