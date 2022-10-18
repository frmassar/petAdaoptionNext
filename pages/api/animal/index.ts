import {
  createAnimal,
  deleteAnimal,
  getAnimals,
  updateAnimal,
} from "../../../lib/api/animal";
import dbConnect from "../../../lib/api/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // todo check userID;

  switch (method) {
    case "GET":
      return getAnimals(req, res);
    case "POST":
      return createAnimal(req, res);
    case "PUT":
      return updateAnimal(req, res);
    case "DELETE":
      return deleteAnimal(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
