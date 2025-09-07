import express from "express";
import session from "express-session";

import dbClient from "./config/databaseConfig.js";
import clientRouter from "./routes/clientRouter.js";
import accountRouter from "./routes/accountRouter.js";
import addressRouter from "./routes/addressRouter.js";
import accountActionRouter from "./routes/accountActionRouter.js";
import settingsRouter from "./routes/settingsRouter.js";

const port = 3000;
const app = express(); // 🔧 express.use() değil, express()

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
    settingsRouter);

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
