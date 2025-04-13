"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Animal } from "../types";

interface AnimalCardProps {
  animal: Animal;
  onDelete?: (id: number) => void;
}

export default function AnimalCard({ animal, onDelete }: AnimalCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir este animal?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/animals/${animal.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (onDelete) {
          onDelete(animal.id!);
        } else {
          router.refresh();
        }
      } else {
        console.error("Erro ao excluir animal");
      }
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition duration-300">
      <h2 className="text-xl font-bold mb-2">{animal.nome}</h2>
      <p className="text-gray-600 text-sm mb-2">{animal.descricao}</p>
      <p className="text-gray-500 text-xs">Espécie: {animal.especie}</p>
      <p className="text-gray-500 text-xs">Habitat: {animal.habitat}</p>
      <p className="text-gray-500 text-xs">País: {animal.pais_origem}</p>
      <p className="text-gray-500 text-xs">
        Cuidados:{" "}
        {animal.cuidados && animal.cuidados.length > 0
          ? animal.cuidados.join(", ")
          : "Nenhum cuidado associado"}
      </p>
      <div className="mt-2 flex gap-2">
        <Link
          href={`/animals/${animal.id}`}
          className="text-blue-500 hover:underline"
        >
          Editar &amp; Detalhes
        </Link>
        <button onClick={handleDelete} className="text-red-500 hover:underline">
          Excluir
        </button>
      </div>
    </div>
  );
}
