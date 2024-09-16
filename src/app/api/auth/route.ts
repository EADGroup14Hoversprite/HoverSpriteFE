import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/types/user";

export async function POST(request: NextRequest) {
  const res = (await request.json()) as IUser;
  if (!res.accessToken) {
    return NextResponse.json({
      message: "Cannot get access token",
      status: 400,
    });
  }
  return NextResponse.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${res.accessToken}; Path=/; HttpOnly; Max-Age=3600000`,
    },
  });
}
