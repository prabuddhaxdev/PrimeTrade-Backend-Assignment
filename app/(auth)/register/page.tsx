"use client";

import { apiClient } from "@/lib/apiClient";
import Link from "next/link";
import { useActionState } from "react";

export type RegisterState = {
  error?: string;
  success?: boolean;
};

const RegisterPage = () => {
  const [state, registerAction, isPending] = useActionState(
    async (
      prevState: RegisterState,
      formData: FormData,
    ): Promise<RegisterState> => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const teamCode = formData.get("teamCode") as string;

      try {
        // Use apiClient instead of manual fetch
        await apiClient.register({
          name,
          email,
          password,
          teamCode: teamCode || undefined,
        });
        window.location.href = "/dashboard";
        return { success: true };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Registration failed",
        };
      }
    },
    { error: undefined, success: undefined },
  );

  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-md">
      <form action={registerAction}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Create new account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        {state?.error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label
              htmlFor="teamCode"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Team Code (Optional)
            </label>
            <input
              id="teamCode"
              name="teamCode"
              type="text"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter team code if you have one"
            />
            <p className="text-xs text-slate-500 mt-1">
              Leave empty if you don&apos;t have a team code
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
