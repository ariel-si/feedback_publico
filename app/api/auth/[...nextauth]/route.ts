import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

const nextAuthHandler = NextAuth(authOptions);

export async function GET(request: NextRequest) {
  return nextAuthHandler(request as any);
}

export async function POST(request: NextRequest) {
  return nextAuthHandler(request as any);
}