import Animal from "../../models/Animals";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./mongoose";
import { AnimalMongo } from "../../types/animal";
import { endianness } from "os";
import { getHttpStatusMessage } from "../../types/httpStatus";
import { animalValidation } from "../validation";
import { unstable_getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export const getAnimals = async (
  req: NextApiRequest,
  res: NextApiResponse<AnimalMongo[]>
) => {
  try {
    await dbConnect();
    const animal: AnimalMongo[] = await Animal.find({}); // todo make pagination
    res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).end(getHttpStatusMessage(500));
  }
};

export const getAnimal = async (
  req: NextApiRequest,
  res: NextApiResponse<AnimalMongo>
) => {
  const { id } = req.query;
  if (!id) res.status(400).end(getHttpStatusMessage(400));

  try {
    await dbConnect();
    const animal: AnimalMongo | null = await Animal.findById({
      _id: id,
    });
    if (!animal) throw "not found";
    return res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).end(getHttpStatusMessage(500));
  }
};

export const deleteAnimal = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) => {
  const { id } = req.body;
  if (!id) res.status(400).end(getHttpStatusMessage(400));

  try {
    await dbConnect();
    const deleteAnimal = await Animal.deleteOne({ _id: id });
    if (deleteAnimal.deletedCount !== 1)
      return res.status(404).end(getHttpStatusMessage(404));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(getHttpStatusMessage(500));
  }
};

export const updateAnimal = async (
  req: NextApiRequest,
  res: NextApiResponse<AnimalMongo>
) => {
  try {
    await dbConnect();
    const animal: AnimalMongo | null = await Animal.findByIdAndUpdate(
      req.body.id,
      req.body.animal
    );
    if (!animal) return res.status(404).end(getHttpStatusMessage(404));
    return res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).end(getHttpStatusMessage(500));
  }
};

export const createAnimal = async (
  req: NextApiRequest,
  res: NextApiResponse<AnimalMongo>
) => {
  const session = await getSession({ req });

  console.log(session);
  const response = animalValidation.safeParse(req.body.animal);
  console.log(response)
  if (!response.success) return res.status(400).end(getHttpStatusMessage(404));
  try {
    await dbConnect();
    
    const animal: AnimalMongo | null = await Animal.create({response});
    if(!session) return res.status(401).end(getHttpStatusMessage(404));
    if (!animal) return res.status(404).end(getHttpStatusMessage(401));

    res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).end(getHttpStatusMessage(500));
  }
};
