"use client";

import { useState } from "react";
import { createFeedback } from "@/actions/feedback.actions";

export default function FeedbackForm({ pageId }: { pageId: string }) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await createFeedback({
        message,
        rating,
        pageId,
      });

      setSuccess(true);
      setMessage("");
      setRating(5);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <p className="text-green-600">
        Feedback enviado com sucesso 👍
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        placeholder="Digite seu feedback..."
        className="border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            Nota {n}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 rounded"
      >
        {loading ? "Enviando..." : "Enviar feedback"}
      </button>
    </form>
  );
}