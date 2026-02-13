import { hashPassword } from "@/lib/auth";
import { PrismaClient } from "@prisma/client/extension";
import { Role } from "@/types";


const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering",
        description: "Software development team",
        code: "ENG-2024",
      },
    }),
    prisma.team.create({
      data: {
        name: "Marketing",
        description: "Marketing and sales team",
        code: "MKT-2024",
      },
    }),
    prisma.team.create({
      data: {
        name: "Operations",
        description: "Business operations team",
        code: "OPS-2024",
      },
    }),
  ]);

  // Create admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@company.com",
      name: "Admin",
      password: await hashPassword("password123"),
      role: Role.ADMIN,
    },
  });

  // Create sample users
  const sampleUsers = [
    {
      name: "John Developer",
      email: "john@company.com",
      team: teams[0],
      role: Role.MANAGER,
    },
    {
      name: "Jane Designer",
      email: "jane@company.com",
      team: teams[0],
      role: Role.USER,
    },
    {
      name: "Bob Marketer",
      email: "bob@company.com",
      team: teams[1],
      role: Role.MANAGER,
    },
    {
      name: "Alice Sales",
      email: "alice@company.com",
      team: teams[1],
      role: Role.USER,
    },
  ];

  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await hashPassword("password123"),
        role: userData.role,
        teamId: userData.team.id,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
