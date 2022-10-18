import { fetcher } from "../lib/utils";
import { Animal, AnimalMongo } from "../types/animal";

export const getAnimals = () => {
  return fetcher("/api/animal");
};

export const createAnimal = (animal: Animal): Promise<AnimalMongo> => {
  return fetcher("/api/animal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ animal }),
  });
};

export const updateAnimal = async (
  animal: Animal,
  id: string
): Promise<AnimalMongo> => {
  return fetcher("/api/animal", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ animal, id }),
  });
};

export const removeAnimal = (id: string):Promise<{success:boolean}> => {
  return fetcher("/api/animal", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};
