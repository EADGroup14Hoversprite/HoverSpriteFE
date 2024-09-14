import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("sessionToken");
  return NextResponse.json(
    { message: "Logout!" },
    {
      status: 200,
    },
  );
}
