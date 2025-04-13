"use client";

import { useState, useEffect } from "react";
import AnimalCard from "@components/AnimalCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Animal } from "../../types";

export default function AnimalsList() {
  const { status } = useSession();
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/animals")
        .then((response) => response.json())
        .then((data: Animal[]) => setAnimals(data))
        .catch((error) => console.error("Erro ao buscar animais:", error));
    }
  }, [status]);

  const handleDeleteAnimal = (id: number) => {
    setAnimals((prevAnimals) =>
      prevAnimals.filter((animal) => animal.id !== id)
    );
  };

  if (status === "loading") {
    return <p className="p-4">Verificando sessão...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">unauthenticated...</p>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Animais</h1>
        <Link
          href="/animals/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar Animal
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onDelete={handleDeleteAnimal}
            />
          ))
        ) : (
          <p>Nenhum animal cadastrado.</p>
        )}
      </div>
    </div>
  );
}
