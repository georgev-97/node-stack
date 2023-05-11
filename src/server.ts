import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./data/db.js"
import {login, signup, logout} from "./controllers/users.js";
import "./passport.js";
import authorize  from "./authorize.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"))
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({msg:"Hello world"});
})

app.post("/login", login);

app.post("/signup", signup);

app.get("/logout", authorize, logout);

app.listen(port, () => {
    console.log("Server started on http://localhost:"+port);
})
