"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Care } from "../../../types";
import { useSession } from "next-auth/react";

export default function CreateCare() {
  const router = useRouter();
  const { status } = useSession();
  const [care, setCare] = useState<Care>({
    nome: "",
    descricao: "",
    frequencia: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
    }
  }, [status, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCare({ ...care, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/cares", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(care),
      });
      if (res.ok) {
        router.push("/cares");
      } else {
        console.error("Erro ao cadastrar cuidado.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cuidado:", error);
    }
  };

  if (status === "loading") {
    return <p className="p-4">Verificando sessão...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">unauthenticated...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Cuidado</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
