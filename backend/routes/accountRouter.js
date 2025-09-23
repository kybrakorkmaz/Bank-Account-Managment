import express from "express";
import { deleteAccount, getAccountList, getMainAccount} from "../repositories/accountRespository.js";
import {createAccount} from "../services/accountService.js";
import {verifyToken} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/accounts/main",verifyToken, async (req, res) => {
    //const clientSession = req.session.client;
    const clientEmail = req.client?.email;
    if (!clientEmail) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }

    try {
        const mainAccount = await getMainAccount(clientEmail);
        if (!mainAccount) {
            return res.status(404).json({ message: "No deposit account found" });
        }
        res.status(200).json(mainAccount);
    } catch (error) {
        console.error("Main account endpoint error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/accounts", verifyToken, async (req, res)=>{
    //const clientSession = req.session.client;
    const clientEmail = req.client?.email;
    if(!clientEmail){
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }
    try{
        const accountList = await getAccountList({ email: clientEmail });
        if(!accountList || accountList.length === 0){
            return res.status(404).json({ message: "No Account Found" });
        }
        res.status(200).json({message: "Accounts Found", accounts: accountList});
    }catch (error){
        res.status(500).json({message: "Internal Server Error", error});
    }
});

router.post("/accounts", verifyToken, async (req, res)=>{
   //const clientSession = req.session.client;
    const clientEmail = req.client?.email;
   if(!clientEmail){
       return res.status(401).json({ message: "Unauthorized: No client session" });
   }
   const result = req.body;
    if (!result) {
        //Eğer yetkisizlik veya boş istek varsa, işlem durmalı.
        // Aksi halde try bloğuna girer. Bu yüzden return eklenmeli:
        return res.status(400).json({ message: "Empty Request" });
    }
   try{
       const newAccount = await createAccount(clientEmail, result);
       return res.status(201).json({ message: "Account created", account: newAccount });
   }catch (error){
       console.error("Account creation failed:", error);
       return res.status(500).json({ message: "Internal Server Error" });
   }
});

router.delete("/accounts/:id", verifyToken, async (req, res) => {
    const accountId = req.params.id;

    //const clientSession = req.session.client;
    const clientEmail = req.client?.email;
    if (!clientEmail) {
        return res.status(401).json({ message: "Unauthorized: No client session" });
    }

    try {
        const isDeleted = await deleteAccount(accountId);

        if (!isDeleted) {
            return res.status(404).json({ message: "Account not found or already deleted" });
        }
        return res.status(200).json({ message: "Account Deleted", account: isDeleted });
    } catch (error) {
        console.error("Account deletion failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;