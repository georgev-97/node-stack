import { Request, Response } from "express";
import { Planet, Planets } from "../data/planets.js";
import Joi from "joi";
import pgPromise from "pg-promise";

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
})

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");
const setupDb = async () => {
  await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        )
    `);
  await db.none(`INSERT INTO PLANETS (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO PLANETS (name) VALUES ('Mars')`);
  console.log("Database created");
};

setupDb();



const getAll = async(req: Request, res: Response) => {
  const planets = await db.many('SELECT * from planets');
  res.status(200).json(planets);
};

const getPlanetById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = db.oneOrNone('SELECT * FROM planets WHERE id=$1', id);
  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const { name } = req.body;

    db.none('INSERT INTO planets (name) VALUES($1)', name);

    res.status(201).json({msg: "Planet created"})
};

const updatePlanetById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  db.none('UPDATE planets SET name=$2 WHERE id=$1', [id,name])

  res.status(200).json({msg: "Planet updated"});
};

const deletePlanetById = (req: Request, res: Response) => {
  const { id } = req.params;

  db.none("DELETE from planets WHERE id=$1", id)

  res.status(200).json({msg: "Planet deleted"});
};

export { getAll, getPlanetById, create, updatePlanetById, deletePlanetById };
