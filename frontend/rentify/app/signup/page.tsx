"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jsonResult, setJsonResult] = useState<object | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = { name, email, password };
    console.log("Signup JSON:", payload);
    setJsonResult(payload);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create an Account
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Fill out your information to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Create Account
          </button>
        </form>

        {jsonResult && (
          <div className="mt-6 rounded-lg bg-zinc-100 p-3 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            <p className="mb-1 font-medium">Generated Signup JSON:</p>
            <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
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