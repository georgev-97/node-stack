import express from "express";
const router = express.Router();
import {
  getAll,
  getPokemonById,
  create,
  updatePokemonById,
  deletePokemonById,
  insertPokemon
} from "../controllers/pokemon.js";

router.get("/", getAll);
router.get("/:id", getPokemonById);
router.post("/insertPokemon", insertPokemon);
router.post("/", create);
router.put("/:id", updatePokemonById);
router.delete("/:id", deletePokemonById);

export default router;
