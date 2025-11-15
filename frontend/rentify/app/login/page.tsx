"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchUserById } from "@/lib/api";
import { useUser } from "@/components/user/UserProvider";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const user = await fetchUserById(userId.trim());
      setUser(user);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to log in";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center p-4">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Log in with your ID
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Paste the user ID you received after signing up.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              User ID
            </label>
            <input
              type="text"
              placeholder="e.g. fGfiCmP3GGW2WMCvW3UE"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
          {status === "success" && <p className="text-xs text-emerald-500">Success! You&apos;re logged in.</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-emerald-500 hover:underline">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
