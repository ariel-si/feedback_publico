import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Prisma } from "@prisma/client";

type PageWithFeedbacks = Prisma.PageGetPayload<{
  include: {
    feedbacks: true;
  };
}>;

export default async function PageDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔐 auth
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
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email as string },
  });

  if (!user) {
    redirect("/login");
  }

  const page: PageWithFeedbacks | null = await prisma.page.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      feedbacks: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-lg p-5 shadow-sm">
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Voltar
        </Link>

        <h1 className="text-2xl font-semibold mt-2 tracking-tight">
          {page.name}
        </h1>

        {page.description && (
          <p className="text-gray-600 mt-1">{page.description}</p>
        )}
      </div>

      {/* Feedbacks */}
      <div className="space-y-4">
        {page.feedbacks.length === 0 && (
          <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
            Nenhum feedback recebido ainda.
          </div>
        )}

        {page.feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">
                ⭐ {fb.rating}/5
              </span>

              <span className="text-xs text-gray-400">
                {new Date(fb.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-800">
              {fb.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
