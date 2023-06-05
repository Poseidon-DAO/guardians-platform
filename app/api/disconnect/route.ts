import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function POST() {
  // @ts-ignore
  cookies().set({
    name: "userId",
    value: "",
    path: "/",
  });

  return NextResponse.json("OK!");
}
