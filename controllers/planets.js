var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
import { db } from "./db.js";
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many("SELECT * FROM planets;");
    res.status(200).json(planets);
});
const getOnById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone("SELECT * FROM planets WHERE id=$1", Number(id));
    res.status(200).json(planet);
});
const planetSchema = Joi.object({
    name: Joi.string().required(),
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newPlanet = { name };
    const validatedPlanet = planetSchema.validate(newPlanet);
    if (validatedPlanet.error) {
        return res.status(400).json({ msg: validatedPlanet.error.details[0].message });
    }
    else {
        yield db.none("INSERT INTO planets (name) VALUES ($1)", name);
        res.status(201).json({ msg: `planet ${name} created` });
    }
});
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req;
    const { id } = req.params;
    if (!(file === null || file === void 0 ? void 0 : file.filename)) {
        res.status(400).json({ error: "upload file failed" });
        return;
    }
    db.none("UPDATE planets SET image=$2 WHERE id=$1", [id, file.path]);
    res.status(201).json({ msg: "image uploaded successfully" });
    console.log(file === null || file === void 0 ? void 0 : file.path);
});
const updatedById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "id required" });
        return;
    }
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ msg: "name required" });
        return;
    }
    yield db.none("UPDATE planets SET name=$1 WHERE id=$2", [name, id]);
    res.status(200).json({ msg: `planet ${name} was updated` });
});
const deleteByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "id required" });
        return;
    }
    yield db.none("DELETE FROM planets WHERE id=$1", id);
    res.status(200).json({ msg: `planet ${id} was deleted` });
});
export { getAll, getOnById, create, createImage, updatedById, deleteByID };
