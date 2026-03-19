// src/app/p/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FeedbackForm from "./feedback-form";

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("SLUG:", slug);

  if (!slug) {
    return <div>Slug inválido</div>;
  }

  const page = await prisma.page.findFirst({
    where: { slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{page.name}</h1>

      {page.description && (
        <p className="text-gray-600 mb-6">{page.description}</p>
      )}

      <FeedbackForm pageId={page.id} />
    </div>
  );
}