// settings.routes.js
import express from "express";
import {
    getSettings,
    updateSettings
} from "../services/settingsService.js";
import {getClientIdByEmail} from "../repositories/clientRepository.js";

const router = express.Router();

router.get("/settings/:id", async (req, res) => {
    const clientSession = req.session.client;
    const clientId = await getClientIdByEmail(clientSession.email);
    try {
        const settings = await getSettings(clientId);
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/settings/:id", async (req, res) => {
    const clientSession = req.session.client;
    const clientId = await getClientIdByEmail(clientSession.email);
    const { email, phone, password, confirmPassword } = req.body; //
    try {
        const updated = await updateSettings(clientId, { email, phone, password, confirmPassword });
        res.json({ message: "Settings updated", updated });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;