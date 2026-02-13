import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import { checkUserPermission, getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { transformTeams, transformUsers } from "@/lib/utils";
import { Role, User } from "@/types";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const user = await getCurrentUser();

  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized");
  }

  // Fetch manager's own team members
  const prismaMyTeamMembers = user.teamId
    ? await prisma.user.findMany({
        where: {
          teamId: user.teamId,
          role: { not: Role.ADMIN },
        },
        include: {
          team: true,
        },
      })
    : [];

  // Fetch ALL team members (cross-team view) - exclude sensitive fields
  const prismaAllTeamMembers = await prisma.user.findMany({
    where: {
      role: { not: Role.ADMIN }, // Exclude super admins from view
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          code: true,
          description: true,
        },
      },
    },
    orderBy: {
      teamId: "asc", // Group by team
    },
  });

  // Fetch all teams for reference
  const prismaTeams = await prisma.team.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      description: true,
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  // Transform Prisma users to frontend users
  const myTeamMembers = transformUsers(prismaMyTeamMembers);
  const allTeamMembers = transformUsers(prismaAllTeamMembers);
  const teams = transformTeams(prismaTeams);

  return (
    <ManagerDashboard
      myTeamMembers={myTeamMembers as User[]}
      allTeamMembers={allTeamMembers as User[]}
      teams={teams}
      currentUser={user}
    />
  );
}
