import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return new NextResponse("Missing name, email or password", { status: 500 });
  }

  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if(exists) {
    return new NextResponse("User already exists", { status: 500 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
  });

  delete user['password'];
  return NextResponse.json(user);
}
