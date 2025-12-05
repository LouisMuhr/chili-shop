// app/admin/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    new URL("/api/admin", "http://localhost:3000")
  );
}