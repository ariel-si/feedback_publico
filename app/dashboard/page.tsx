import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
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
    include: {
      pages: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Minhas páginas
        </h1>

        <Link
          href="/dashboard/new"
          className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          Nova página
        </Link>
      </div>

      {/* Empty state */}
      {user?.pages.length === 0 && (
        <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
          Você ainda não criou nenhuma página.
        </div>
      )}

      {/* Lista de páginas */}
      <div className="flex flex-col gap-4">
        {user?.pages.map((page: { id: string; name: string; description: string; slug: string }) => (
          <div
            key={page.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition flex justify-between items-center"
          >
            {/* Info */}
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-900">
                {page.name}
              </h2>

              {page.description && (
                <p className="text-sm text-gray-500">
                  {page.description}
                </p>
              )}

              <div className="text-xs text-gray-400 mt-1 break-all">
                /p/{page.slug}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href={`/p/${page.slug}`}
                target="_blank"
                className="text-sm text-blue-600 hover:underline"
              >
                Abrir
              </a>

              <Link
                href={`/dashboard/page/${page.id}`}
                className="text-sm underline"
              >
                Ver feedbacks
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}