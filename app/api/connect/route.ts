import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function POST(request: Request) {
  const backendUrl = new URL("/user/register", baseUrl);
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address");

  const backendRes = await fetch(backendUrl.toString(), {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ address }),
  });
  const backendData = await backendRes.json();

  // @ts-ignore
  cookies().set("userId", backendData?.user?.id);

  return NextResponse.json(backendData?.user);
}
