import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";

const handler = NextAuth(authOptions);

// 🔥 wrapper para tipagem correta
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}