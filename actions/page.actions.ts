// src/actions/page.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function createPage(data: {
  name: string;
  description?: string;
}) {
  const cookieStore = await cookies();

  const token = await getToken({
    req: {
      headers: {
        cookie: cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; "),
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email as string },
  });

  if (!user) throw new Error("User not found");

  const slug = `${slugify(data.name, { lower: true })}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  return prisma.page.create({
    data: {
      name: data.name,
      description: data.description,
      slug,
      userId: user.id,
    },
  });
}