import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./controllers/planets.js"
import mainRouter from "./router/planets.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"))
app.use(express.json());

app.use("/api/planets", mainRouter);

app.listen(port, () => {
    console.log("Server started on http://localhost:"+port);
})
