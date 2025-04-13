import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000/api/animal";

export async function GET() {
  try {
    const res = await fetch(BACKEND_URL);
    if (!res.ok) {
      throw new Error("Erro ao buscar animais");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da API de animais." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao cadastrar o animal na API." },
      { status: 500 }
    );
  }
}
