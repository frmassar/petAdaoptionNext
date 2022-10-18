import { useState } from "react";
import { useForm } from "react-hook-form";
import { createAnimal, updateAnimal } from "../lib/animal";
import { Animal } from "../types/animal";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalValidation } from "../lib/validation";


import * as z from "zod";
import router from "next/router";

interface AnimalFormProps {
  animal?: Animal;
  animalId?: string;
  isNew: boolean;
}
export default function AnimalForm({
  animal,
  animalId,
  isNew,
}: AnimalFormProps) {
  const defaultValues = {
    name: animal?.name || "",
    race: animal?.race || "",
    description: animal?.description || "",
    type: animal?.type || "",
    gender: animal?.gender || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Animal>({
    resolver: zodResolver(animalValidation),
    defaultValues,
  });

  const [isLoading, setLoading] = useState(false);

  const createOrUpdateAnimal = async (animal: Animal) => {
    console.log("outer");
    if (isNew) {
      console.log("here");
      console.log(animal)
      const toto = await createAnimal(animal);
      console.log(toto);
    } else if (animalId) {
      console.log("there");
      await updateAnimal(animal, animalId);
    }

    // todo finish

    // if (!data.success) {
    //   return; // todo manage error
    // }

    router.push("/dashboard");
  };

  // const onSubmit = data => {
  //   console.log(data)
  //   // createOrUpdateAnimal(animal);
  // } 



  

  return (
    <div className="flex justify-center items-center h-screen w-full bg-blue-400">
      <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          Register your animal
        </h1>
        <form
          className="w-full max-w-lg"
          onSubmit={handleSubmit(createOrUpdateAnimal)}
        >
          <label>Name</label>
          <input type="text" {...register("name")} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <label>Race</label>
          <input type="text" {...register("race")} />
          {errors.race?.message && <p>{errors.race?.message}</p>}
          <label>Description</label>
          <textarea {...register("description")} />
          {errors.description?.message && <p>{errors.description?.message}</p>}
          <label>Type</label>
          <select {...register("type")}>
            <option value="chat">Chat</option>
            <option value="chien">Chien</option>
          </select>
          {errors.type?.message && <p>{errors.type?.message}</p>}
          <label>Gender</label>
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          {errors.gender?.message && <p>{errors.gender?.message}</p>}

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Add Animal
          </button>
        </form>
      </div>
    </div>
  );
}
