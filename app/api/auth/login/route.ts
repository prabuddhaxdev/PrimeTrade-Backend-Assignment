
import { generateToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Hello");
    const { email, password } = await request.json();

    /// Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email, and password are required or not valid" },
        { status: 400 },
      );
    }

    // Find user
    console.log("finding user");
    const userFromDb = await prisma.user.findUnique({
      where: { email },
      include: { team: true },
    });

    console.log("The user from DB is : ", userFromDb);

    if (!userFromDb) {
      return NextResponse.json(
        { error: "Invalid credentails" },
        { status: 401 },
      );
    }

    const isValidPassword = await verifyPassword(password, userFromDb.password);

    console.log("password match : ", isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentails" },
        { status: 401 },
      );
    }

    // Generate Token
    const token = generateToken(userFromDb.id);
    console.log("token is generated : ", token);
    // Create response
    const response = NextResponse.json({
      user: {
        id: userFromDb.id,
        email: userFromDb.email,
        name: userFromDb.name,
        role: userFromDb.role,
        teamId: userFromDb.teamId,
        team: userFromDb.team,
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
