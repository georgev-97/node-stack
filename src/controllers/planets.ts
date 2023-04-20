// import pgPromise from "pg-promise";
// import { Request, Response } from "express";
// import Joi from "joi";

// const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");
// const setupDb = async () => {
//   await db.none(`
//         DROP TABLE IF EXISTS planets;

//         CREATE TABLE planets(
//             id SERIAL NOT NULL PRIMARY KEY,
//             name TEXT NOT NULL
//         )
//     `);
//   await db.none(`INSERT INTO PLANETS (name) VALUES ('Earth')`);
//   await db.none(`INSERT INTO PLANETS (name) VALUES ('Mars')`);
//   console.log("Database created");
// };

// setupDb();

// const create = (req: Request, res: Response) => {
//   const { id, name } = req.body;
//   const newPlanet = { id: id, name: name };
//   res.status(201).json({ msg: "Planet created" });
// };

// export {create};

type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];
