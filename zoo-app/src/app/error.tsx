"use client";

import React, { useEffect } from "react";

interface IPropsError {
  error: Error & { digest: string };
  reset: () => void;
}

export default function Error({ error, reset }: IPropsError) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="m-auto mt-28 text-white bg-blue w-1/2 overflow-hidden rounded-md">
      <h2 className="p-5">
        Desculpe, algo deu errado. Por favor, tente novamente mais tarde!
      </h2>
      <p className="p-2 text-red flex flex-wrap justify-center gap-2">
        Erro:
        <pre className="whitespace-pre-wrap">{error.message}</pre>
      </p>
      <button
        id="error-reset-button"
        title="tentar novamente"
        aria-label="error reset button"
        className="bg-green rounded-md p-2 m-2 shadow-md active:scale-95"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  );
}
