"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserAccount } from "@/lib/api";
import { useUser } from "@/components/user/UserProvider";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const { setUser } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setCreatedId(null);
    try {
      const user = await createUserAccount({ name, email, password });
      setUser(user);
      setCreatedId(user.id);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to create user";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create an Account
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          You&apos;ll receive a user ID that you can use to log in later.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Name</label>
            <input
              type="text"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating account…" : "Create Account"}
          </button>
        </form>

        {createdId && (
          <div className="mt-6 rounded-lg bg-zinc-100 p-3 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            <p className="mb-1 font-medium">Success! Save this user ID:</p>
            <pre className="text-sm font-mono">{createdId}</pre>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-500 hover:underline">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
