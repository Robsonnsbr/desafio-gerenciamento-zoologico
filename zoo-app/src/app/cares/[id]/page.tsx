"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Care } from "../../../types";

export default function CareDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { status } = useSession();
  const [care, setCare] = useState<Care | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/cares/${id}`)
        .then((res) => res.json())
        .then((data: Care) => setCare(data))
        .catch((error) => console.error("Erro ao buscar cuidado:", error));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (care) {
      setCare({ ...care, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (care) {
      try {
        const res = await fetch(`/api/cares/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(care),
        });
        if (res.ok) {
          router.push("/cares");
        } else {
          console.error("Erro ao atualizar cuidado.");
        }
      } catch (error) {
        console.error("Erro ao atualizar cuidado:", error);
      }
    }
  };

  if (status === "loading" || !care) {
    return <p className="p-4">Carregando...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">unauthenticated...</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Detalhes e Edição do Cuidado</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome do Cuidado</label>
          <input
            type="text"
            name="nome"
            value={care.nome}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            value={care.descricao}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Frequência</label>
          <input
            type="text"
            name="frequencia"
            value={care.frequencia}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Animais</label>
          <input
            type="text"
            name="animais"
            value={care.animais ? care.animais.join(", ") : ""}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
