
import { generateToken, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, teamCode } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required or not valid" },
        { status: 400 },
      );
    }

    // Find user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Find team if teamCode is provided
    let teamId: string | undefined;
    if (teamCode) {
      const team = await prisma.team.findUnique({
        where: { code: teamCode },
      });

      if (!team) {
        return NextResponse.json(
          { error: "Please enter a valid team code" },
          { status: 400 },
        );
      }
      teamId = team.id;
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    // First user becomes ADMIN, others become USER
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        teamId,
      },
      include: {
        team: true,
      },
    });

    // Generate Token
    const token = generateToken(user.id);

    console.log("token is generated : ", token);

    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        teamId: user.teamId,
        team: user.team,
        token,
      },
    });

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error, Something went wrong!" },
      { status: 500 },
    );
  }
}
