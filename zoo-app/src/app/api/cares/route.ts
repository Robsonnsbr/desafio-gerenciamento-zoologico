import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000/api/cuidado";

export async function GET() {
  try {
    const res = await fetch(BACKEND_URL);
    if (!res.ok) {
      throw new Error("Erro ao buscar cuidados");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar cuidados:", error);
    return NextResponse.json(
      { error: "Erro ao ler os dados de cuidados da API." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao cadastrar cuidado:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar o cuidado na API." },
      { status: 500 }
    );
  }
}
