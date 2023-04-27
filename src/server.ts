import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./controllers/pokemon.js"
import mainRouter from "./router/pokemon.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"))
app.use(express.json());

app.use("/api/pokemon", mainRouter);

app.listen(port, () => {
    console.log("Server started on http://localhost:"+port);
})

/** Salvare il nome del pokemon nel DB e avere la possibilità di modificarlo
 * 
 * https://pokeapi.co/api/v2/pokemon/ditto
*/