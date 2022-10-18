import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getAnimals, removeAnimal } from "../../lib/animal";
import { WithSession } from "../../types/next";
import { AnimalMongo } from "../../types/animal";

const Dashboard: NextPage = ({ session }) => {
  const router = useRouter();

  const [animals, setAnimals] = useState<AnimalMongo[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAnimals().then((animal) => {
      setAnimals(animal);
    });
  }, []);

  const deleteAnimal = async (id: string) => {
    await removeAnimal(id);
    getAnimals().then((animal) => {
      setAnimals(animal);
    });
  };

  if (animals?.length <= 0)
    return (
      <>
        <p>No data</p>
        <Link href="/dashboard/animal">
          <a>
            <Button>Add a pet </Button>
          </a>
        </Link>
      </>
    );

  return (
    <>
      {animals.map((animal) => (
        <div key={animal._id}>
          <>{animal.name}</>
          <button onClick={() => deleteAnimal(animal._id)}>
            <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
              x
            </span>
          </button>

          <Link href={`/dashboard/animal?id=${animal._id}`}>
            <a>
              <Button>update a pet </Button>
            </a>
          </Link>
        </div>
      ))}
      <Link href="/dashboard/animal">
        <a>
          <Button>Add a pet </Button>
        </a>
      </Link>
    </>
  );
};

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

export default Dashboard;
