import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

const Home = async() =>{
  const user = await getCurrentUser();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Task Management and Team Access Control
      </h1>
      <p className="text-slate-300 mb-8">
        This assignment is to build Scalable REST API with Authentication &
        Role-Based Access with simple frontend UI
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-6 border border-slate-700 rounded-lg">
          <h3 className="font-semibold mb-3 text-white">
            Features Implemented:{" "}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Role Based access control (RBAC)</li>
            <li>User registration & login APIs with password hashing</li>
            <li>Secure JWT token handling</li>
            <li>Validation using Zod</li>
            <li>Error handling</li>
          </ul>
        </div>
        <div className="bg-slate-800 p-6 border border-slate-700 rounded-lg">
          <h3 className="font-semibold mb-3 text-white">User Roles:</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <strong className="text-purple-400">SUPER_ADMIN: </strong> Full
              system access
            </li>
            <li>
              <strong className="text-green-400">ADMIN: </strong> User & team
              management
            </li>
            <li>
              <strong className="text-yellow-400">MANAGER: </strong>{" "}
              Team-specific management
            </li>
            <li>
              <strong className="text-blue-400">USER: </strong> Basic dashboard
              access
            </li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
          <p className="text-green-300">
            Welcome back, <strong>{user.name}</strong>! You are logged in as{" "}
            <strong className="text-green-200">{user.role}</strong>.
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <p className="text-slate-300 mb-3">You are not logged in.</p>
          <div className="space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded hover:bg-slate-800 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home