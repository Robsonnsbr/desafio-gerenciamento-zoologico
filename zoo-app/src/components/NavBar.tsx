import Link from "next/link";
import LogoutButton from "./LogoutButton";
import LoginButton from "@components/LoginButton";

export default function Navbar() {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-white font-bold text-xl">Zoo Management</h1>

        <div>
          <Link href="/" className="text-white mr-4">
            Home
          </Link>
          <Link href="/animals" className="text-white mr-4">
            Animais
          </Link>
          <Link href="/cares" className="text-white">
            Cuidados
          </Link>
        </div>
        <div className="flex gap-2">
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
