import { Request, Response } from "express";
import { Planet, Planets } from "../data/planets.js";
import Joi from "joi";

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
})

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

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

const getPlanetById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet: Planet | undefined = planets.find((p) => p.id == Number(id));
  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id: id, name: name };
  const validation = planetSchema.validate(newPlanet);
  if(validation.error){
    return res.status(400).json({msg: validation.error.details[0].message})
  }
    planets = [...planets, validation.value];
    res.status(201).json({msg: "Planet created"})
};

const updatePlanetById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );

  res.status(200).json({msg: "Planet updated"});
};

const deletePlanetById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets.filter((planet) => planet.id !== Number(id));

  res.status(200).json({msg: "Planet deleted"});
};

export { getAll, getPlanetById, create, updatePlanetById, deletePlanetById };
