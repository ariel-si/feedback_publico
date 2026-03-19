"use server";

import { prisma } from "@/lib/prisma";

export async function createFeedback(data: {
  message: string;
  rating: number;
  pageId: string;
}) {
  if (!data.message) {
    throw new Error("Mensagem obrigatória");
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Nota inválida");
  }

  return prisma.feedback.create({
    data: {
      message: data.message,
      rating: data.rating,
      pageId: data.pageId,
    },
  });
}