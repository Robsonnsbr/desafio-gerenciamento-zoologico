"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Animal } from "../../../types";

export default function AnimalDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { status } = useSession();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && id) {
      fetch(`/api/animals/${id}`)
        .then((res) => res.json())
        .then((data: Animal) => setAnimal(data))
        .catch((error) => console.error("Erro ao buscar animal:", error));
    }
  }, [status, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (animal) {
      setAnimal({ ...animal, [e.target.name]: e.target.value });
    }
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
    if (animal) {
      try {
        const res = await fetch(`/api/animals/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(animal),
        });
        if (res.ok) {
          router.push("/animals");
        } else {
          console.error("Erro ao atualizar animal.");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };
  if (status === "loading" || !animal) {
    return <p className="p-4">Carregando...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">unauthenticated...</p>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes e Edição do Animal</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={animal.nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        {/* Campo Descrição */}
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            value={animal.descricao}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        {/* Campo Data de Nascimento */}
        <div className="mb-4">
          <label className="block text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={animal.dataNascimento}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        {/* Campo Espécie */}
        <div className="mb-4">
          <label className="block text-gray-700">Espécie</label>
          <input
            type="text"
            name="especie"
            value={animal.especie}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        {/* Campo Habitat */}
        <div className="mb-4">
          <label className="block text-gray-700">Habitat</label>
          <input
            type="text"
            name="habitat"
            value={animal.habitat}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        {/* Campo País de Origem */}
        <div className="mb-4">
          <label className="block text-gray-700">País de Origem</label>
          <input
            type="text"
            name="pais_origem"
            value={animal.pais_origem}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        {/* Campo Cuidados */}
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
          Atualizar
        </button>
      </form>
    </div>
  );
}
