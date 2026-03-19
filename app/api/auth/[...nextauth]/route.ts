import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";

// cria handler
const nextAuthHandler: any = NextAuth(authOptions);

// força tipagem correta pro Next 16
export async function GET(request: NextRequest) {
  return nextAuthHandler(request as any);
}

export async function POST(request: NextRequest) {
  return nextAuthHandler(request as any);
}