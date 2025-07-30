import { type NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { mode, name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // ✅ Register new admin
    if (mode === "register") {
      if (!name) {
        return NextResponse.json({ error: "Name is required for registration" }, { status: 400 });
      }

      const exists = await prisma.admin.findUnique({ where: { email } });
      if (exists) {
        return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
      }

      const hashedPassword = await hash(password, 10);

      const admin = await prisma.admin.create({
        data: {
          name,
          email,
          password: hashedPassword,
          // role will default to "admin"
        },
      });

      return NextResponse.json({
        success: true,
        message: "Admin created successfully",
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // ✅ Login existing admin
    const admin = await authenticateAdmin(email, password);

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(admin);

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}