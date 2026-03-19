"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type RegisterInput = {
  email: string;
  password: string;
};

export async function registerUser(data: RegisterInput) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    email: user.email,
  };
}