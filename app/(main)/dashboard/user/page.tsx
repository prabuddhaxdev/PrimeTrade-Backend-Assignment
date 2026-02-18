import UserDashboard from "@/components/dashboard/UserDashboard";
import { getCurrentUser } from "@/lib/auth";
import {prisma} from "@/lib/db";
import { User } from "@/types";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user-specific data
  const teamMembers = user.teamId
    ? await prisma.user.findMany({
        where: {
          teamId: user.teamId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
    : [];

  return (
    <UserDashboard teamMembers={teamMembers as User[]} currentUser={user} />
  );
}
