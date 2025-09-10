import express from "express";
import Client from "../Models/client.js";
import { checkCredentials } from "../services/clientService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log("Login endpoint hit");
    const { email, password } = req.body;
    const clientObj = new Client(email, password);

    try {
        const response = await checkCredentials(clientObj);
        console.log("Auth response:", response);
        if (!response.success) {
            if (response.reason === "NOT_FOUND") {
                return res.status(404).json({ message: "Client not found" });
            }
            if (response.reason === "WRONG_PASSWORD") {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }

        req.session.client = { email: response.client.email };
        console.log("Session:", req.session.client);
        return res.status(200).json({ message: "Logged in successfully" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
