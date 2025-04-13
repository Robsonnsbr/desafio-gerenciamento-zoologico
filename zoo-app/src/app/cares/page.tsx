"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CareCard from "@components/CareCard";
import { Care } from "../../types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CareList() {
  const [cares, setCares] = useState<Care[]>([]);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/cares")
        .then((response) => response.json())
        .then((data: Care[]) => setCares(data))
        .catch((error) => console.error("Erro ao buscar cuidados:", error));
    }
  }, [status]);

  const handleDeleteCare = (id: number) => {
    setCares((prevCares) => prevCares.filter((care) => care.id !== id));
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
        <h1 className="text-2xl font-bold">Lista de Cuidados</h1>
        <Link
          href="/cares/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar Cuidado
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cares.length > 0 ? (
          cares.map((care) => (
            <CareCard key={care.id} care={care} onDelete={handleDeleteCare} />
          ))
        ) : (
          <p>Nenhum cuidado cadastrado.</p>
        )}
      </div>
    </div>
  );
}
