import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";


import dbClient from "./config/databaseConfig.js";
import clientRouter from "./routes/clientRouter.js";
import accountRouter from "./routes/accountRouter.js";
import addressRouter from "./routes/addressRouter.js";
import accountActionRouter from "./routes/accountActionRouter.js";
import settingsRouter from "./routes/settingsRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

const port = process.env.PORT;
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN, //frontend address
    credentials: true
}));

// middleware to read json body
app.use(express.json());


/*app.use(session({
    secret: "gizliAnahtar",
    resave: false,
    saveUninitialized: true,
}));*/

// binding router
app.use("/api/v1/",
    clientRouter,
    addressRouter,
    accountRouter,
    accountActionRouter,
    settingsRouter,
    transactionRouter);

// DB Connection
function startDBConnection() {
    dbClient.connect()
        .then(() => {
            console.log("Connected to database");
        })
        .catch(err => {
            console.error("Connection Error", err);
        });
}

startDBConnection();

// start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);