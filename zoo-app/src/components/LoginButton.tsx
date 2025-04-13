"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const stored = sessionStorage.getItem("redirectAfterLogin");
    if (stored) setRedirectPath(stored);
  }, []);

  return (
    <button
      onClick={() =>
        signIn("github", {
          callbackUrl: redirectPath,
        })
      }
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Entrar com GitHub
    </button>
  );
}
