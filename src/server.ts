import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "./controllers/planets.js"
const app = express();
const port = 3000;

app.use(morgan("dev"))
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({msg:"Hello world"});
})

app.listen(port, () => {
    console.log("Server started on http://localhost:"+port);
})
