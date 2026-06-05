"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { message?: string };
    setLoading(false);
    setMessage(data.message ?? (response.ok ? "Subscribed successfully." : "Unable to subscribe."));
    if (response.ok) setEmail("");
  }

  return (
    <form onSubmit={submit} className={compact ? "flex gap-2" : "grid gap-3"}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
      />
      <button
        disabled={loading}
        className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {loading ? "Joining..." : "Join newsletter"}
      </button>
      {message ? <p className="text-sm text-white/70">{message}</p> : null}
    </form>
  );
}
