import { User } from "@/types";

interface UserDashboardProps {
  teamMembers: User[];
  currentUser: User;
}

export default function UserDashboard({
  teamMembers,
  currentUser,
}: UserDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-white">User Dashboard</h1>
        <p className="text-slate-300">Welcome, {currentUser.name}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* My Team */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-4 border-b border-slate-700">
            <h3 className="font-semibold text-white">
              My Team ({teamMembers.length})
            </h3>
          </div>
          <div className="p-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border-b border-slate-600 py-2 last:border-b-0"
              >
                <p className="text-sm text-slate-200">{member.name}</p>
                <p className="text-sm text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Projects
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-4 border-b border-slate-700">
          {/* <h3 className="font-semibold text-white">
              Team Projects ({userProjects.length})
            </h3>
          </div>
          <div className="p-4">
            {userProjects.map((project) => (
              <div
                key={project.id}
                className="border-b border-slate-700 py-2 last:border-b-0"
              >
                <p className="font-medium text-white">{project.name}</p>
                <p className="text-sm text-slate-400">{project.description}</p>
              </div>
            ))}
          </div> }
        </div>
      </div> */}

      {/* Permission Info
      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <h3 className="font-semibold mb-2 text-blue-300">Your Permissions</h3>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• View team members and projects</li>
          <li>• Access user dashboard</li>
          <li>• Update your profile information</li>
        </ul>
      </div> */}
    </div>
  );
}
