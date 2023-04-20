import express from "express";
const router = express.Router();
import {
  getAll,
  getPlanetById,
  create,
  updatePlanetById,
  deletePlanetById,
} from "../controllers/planets.js";

router.get("/", getAll);
router.get("/:id", getPlanetById);
router.post("/", create);
router.put("/:id", updatePlanetById);
router.delete("/:id", deletePlanetById);

export default router;
