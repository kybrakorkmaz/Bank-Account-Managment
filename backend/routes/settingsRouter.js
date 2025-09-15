// settings.routes.js
import express from "express";
import {
    getSettings,
    updateSettings
} from "../services/settingsService.js";
import {getClientIdByEmail} from "../repositories/clientRepository.js";

const router = express.Router();

router.get("/settings", async (req, res) => {
    const clientSession = req.session.client;
    try {
        const clientId = await getClientIdByEmail(clientSession.email);
        console.log("router", clientId);
        const settings = await getSettings(clientId);
        console.log(settings);
        return res.status(200).json({message:"success", settings: settings});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch("/settings", async (req, res) => {
    const clientSession = req.session.client;
    if (!clientSession?.email) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }

    const clientId = await getClientIdByEmail(clientSession.email);
    const updateFields = req.body;

    if (!updateFields || Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "Empty update request" });
    }

    try {
        const updatedSettings = await updateSettings(clientId, updateFields);
        if (!updatedSettings) {
            return res.status(404).json({ message: "Settings not found or not updated" });
        }
        return res.status(200).json({ message: "Settings updated successfully", settings: updatedSettings });
    } catch (error) {
        console.error("Settings update failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;