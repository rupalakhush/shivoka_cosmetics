import { NextResponse } from "next/server";
export async function POST(request) {
  return new NextResponse(
    JSON.stringify({
      message: "Unauthorized access! & we have caught youh, now we'll HealUh! 💘",
    }),
    { status: 500 }
  );
}
