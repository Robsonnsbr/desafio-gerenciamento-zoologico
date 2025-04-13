"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Animal } from "../../../types";

export default function CreateAnimal() {
  const router = useRouter();
  const { status } = useSession();
  const [animal, setAnimal] = useState<Animal>({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    pais_origem: "",
    cuidados: [],
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
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleCuidadosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (animal) {
      const cuidados = e.target.value
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      setAnimal({ ...animal, cuidados });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animal),
      });
      if (res.ok) {
        router.push("/animals");
      } else {
        console.error("Erro ao cadastrar animal");
      }
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
    }
  };

  if (status === "loading") {
    return <p className="p-4">Verificando sessão...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">unauthenticated...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastrar Animal</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={animal.nome}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            value={animal.descricao}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={animal.dataNascimento}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Espécie</label>
          <input
            type="text"
            name="especie"
            value={animal.especie}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Habitat</label>
          <input
            type="text"
            name="habitat"
            value={animal.habitat}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">País de Origem</label>
          <input
            type="text"
            name="pais_origem"
            value={animal.pais_origem}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Cuidados (IDs, separados por vírgula)
          </label>
          <input
            type="text"
            name="cuidados"
            value={animal.cuidados ? animal.cuidados.join(", ") : ""}
            onChange={handleCuidadosChange}
            className="mt-1 block w-full border rounded px-3 py-2"
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
