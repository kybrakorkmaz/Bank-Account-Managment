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

const port = 3000;
const app = express();
app.use(cors({
    origin: "http://localhost:5173", //frontend address
    credentials: true
}));

// middleware to read json body
app.use(express.json());

app.use(session({
    secret: "gizliAnahtar",
    resave: false,
    saveUninitialized: true,
}));

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
