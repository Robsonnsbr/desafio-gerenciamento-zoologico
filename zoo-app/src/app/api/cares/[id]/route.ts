import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000/api/cuidado";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const res = await fetch(`${BACKEND_URL}/${id}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Cuidado não encontrado." },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar cuidado na API." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const body = await request.json();

    const res = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao atualizar o cuidado." },
        { status: res.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar cuidado." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const res = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao remover o cuidado." },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: "Cuidado removido com sucesso." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro interno ao remover cuidado." },
      { status: 500 }
    );
  }
}
