import { Request, Response } from "express";
import { Planet, Planets } from "../data/pokemon.js";
import Joi from "joi";
import pgPromise from "pg-promise";

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");
const setupDb = async () => {
  await db.none(`
        DROP TABLE IF EXISTS pokemon;

        CREATE TABLE pokemon(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            tipo TEXT NOT NULL
        )
    `);
  // await db.none(`INSERT INTO PLANETS (name) VALUES ('Earth')`);
  // await db.none(`INSERT INTO PLANETS (name) VALUES ('Mars')`);
  console.log("Database created");
};

setupDb();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many("SELECT * from pokemon");
  res.status(200).json(planets);
};

const getPokemonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = db.oneOrNone("SELECT * FROM pokemon WHERE id=$1", id);
  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const { name } = req.body;

  db.none("INSERT INTO pokemon (name) VALUES($1)", name);

  res.status(201).json({ msg: "Pokemon created" });
};

const updatePokemonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  // isGetOk(req, res, "id", "name");

  db.none("UPDATE pokemon SET name=$2 WHERE id=$1", [id, name]);

  res.status(200).json({ msg: "Pokemon updated" });
};

const deletePokemonById = (req: Request, res: Response) => {
  const { id } = req.params;
  isGetOk(req, res, "id");
  db.none("DELETE from pokemon WHERE id=$1", id);

  res.status(200).json({ msg: "Pokemon deleted" });
};

const insertPokemon = async (req: Request, res: Response) => {
  const { pokemonName } = req.body;
  if(!isPostOk(req, res, "pokemonName")){
    return res.json({ error: "Invalid request" });
  }
  const pokemonRaw = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const {name} = await pokemonRaw.json();
  db.none("INSERT INTO pokemon (name,tipo) VALUES ($1, $2)", [name,name]);
  return res.json({msg: "Pokemon inserito"})
};

const isGetOk = (req: Request, res: Response, ...requiredParams:string[]) => {
  for (let param of requiredParams) {
    if (!req.params[param]) {
      return false;
    }
  }
  return true;
};

const isPostOk = (req: Request, res: Response, ...requiredParams:string[]) => {
  for (let param of requiredParams) {
    if (!req.body[param]) {
      return false;
    }
  }
  return true;
};

export {
  getAll,
  getPokemonById,
  create,
  updatePokemonById,
  deletePokemonById,
  insertPokemon,
};
