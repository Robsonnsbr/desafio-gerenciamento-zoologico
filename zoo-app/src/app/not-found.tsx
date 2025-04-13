// app/not-found.tsx
import Link from "next/link";

import { TbError404Off } from "react-icons/tb";
import { PiKeyReturnFill } from "react-icons/pi";
export default function NotFound() {
  return (
    <div id="not-found-section ">
      <div className="text-center text-white bg-red p-10">
        <h1 aria-label="Erro 404">
          <TbError404Off
            aria-label="icon erro 404"
            className="size-32 m-auto"
          />
        </h1>
        <p className="text-2xl mb-6">Página não encontrada</p>
        <Link
          href="/"
          className="text-lg font-medium text-blue-400 hover:text-blue active:text-black"
        >
          Voltar para a página inicial
          <PiKeyReturnFill className="size-9 m-auto" />
        </Link>
      </div>
    </div>
  );
}
