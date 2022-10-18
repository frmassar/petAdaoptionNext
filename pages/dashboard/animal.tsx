import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { fetcher, parseQueryParam } from "../../lib/utils";
import { createAnimal, updateAnimal } from "../../lib/animal";
import { type } from "os";
import { Session } from "next-auth";
import { Animal } from "../../types/animal";
import AnimalForm from "../../components/AnimalForm";

export default function AnimalPage({ session }) {
  const router = useRouter();
  const animalId = parseQueryParam(router.query.id);
  const [animal, setAnimal] = useState<Animal>();
  const isNewAnimal = animalId ? false : true;

  useEffect(() => {
    const fetchSpecificAnimal = async () => {
      const fetchedAnimal = await fetcher(`/api/animal/${animalId}`);
      setAnimal(fetchedAnimal);
    };

    if (animalId) fetchSpecificAnimal();
  }, [animalId]);

  return (
    <>
      {animal || isNewAnimal ? (
        <AnimalForm animal={animal} animalId={animalId} isNew={isNewAnimal} />
      ) : (
        <div>LOADING...</div>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const session = await getSession(context as any);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
