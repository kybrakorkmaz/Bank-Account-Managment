import express from "express";
import {
    addClientAddress,
    getClientAddresses,
    removeAddressById,
    updateClientAddressById
} from "../services/addressService.js";


const router = express.Router();

router.get("/addresses", async (req, res) => {
    const clientSession = req.session.client;
    if (!clientSession?.email) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }
    try {
        const addresses = await getClientAddresses(clientSession);
        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ message: "No addresses found" });
        }
        return res.status(200).json({ message: "Addresses retrieved successfully", addresses });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});

router.post("/addresses", async (req, res) => {
    const clientSession = req.session.client;
    if (!clientSession?.email) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }
    try {
        const addressDetail = req.body;
        if (!addressDetail) {
            return res.status(400).json({ message: "Empty request body" });
        }
        const newAddress = await addClientAddress(clientSession, addressDetail);
        return res.status(201).json({ message: "New address has been successfully added", address: newAddress });
    } catch (error) {
        console.error("Address creation failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.patch("/addresses/:id", async (req, res) => {
    const clientSession = req.session.client;
    if (!clientSession?.email) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }
    try {
        const addressId = req.params.id;
        const updateFields = req.body;
        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "Empty update request" });
        }
        const updatedAddress = await updateClientAddressById(clientSession, addressId, updateFields);
        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found or not updated" });
        }
        return res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        console.error("Address update failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/addresses/:id", async (req, res) => {
    try {
        const addressId = req.params.id;
        if (!addressId) {
            return res.status(400).json({ message: "Missing address ID" });
        }
        const deletedAddress = await removeAddressById(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found or already deleted" });
        }
        return res.status(200).json({ message: "Address has been removed", address: deletedAddress });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
