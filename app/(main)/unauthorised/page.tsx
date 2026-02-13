import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Access Denied</h1>
      <p className="text-slate-300 mb-6">
        You don&apos;t have permission to access this page.
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
