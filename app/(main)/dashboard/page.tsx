import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Role } from "@/types";

const DashboardLayout = async () => {
  console.log("I am in dashboard");
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  // Redirect based on user role
  switch (user.role) {
    case Role.ADMIN:
      redirect("/dashboard/admin");
    case Role.MANAGER:
      redirect("/dashboard/manager");
    case Role.USER:
      redirect("/dashboard/user");
    default:
      redirect("/dashboard/user");
  }
};

export default DashboardLayout;
