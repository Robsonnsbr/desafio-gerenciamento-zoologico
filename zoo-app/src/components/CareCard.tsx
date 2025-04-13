"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Care } from "../types";

interface CareCardProps {
  care: Care;
  onDelete?: (id: number) => void;
}

export default function CareCard({ care, onDelete }: CareCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este cuidado?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/cares/${care.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (onDelete) {
          onDelete(care.id!);
        } else {
          router.refresh();
        }
      } else {
        console.error("Erro ao excluir cuidado");
      }
    } catch (error) {
      console.error("Erro ao excluir cuidado:", error);
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition duration-300">
      <h2 className="text-xl font-bold mb-2">{care.nome}</h2>
      <p className="text-gray-600 text-sm mb-2">{care.descricao}</p>
      <p className="text-gray-500 text-xs">Frequência: {care.frequencia}</p>
      <p className="text-gray-500 text-xs">
        Animais:{" "}
        {care.animais && care.animais.length > 0
          ? care.animais.join(", ")
          : "Nenhum animal associado"}
      </p>
      <div className="mt-2 flex gap-2">
        <Link
          href={`/cares/${care.id}`}
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
