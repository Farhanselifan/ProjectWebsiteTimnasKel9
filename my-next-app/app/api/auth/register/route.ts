import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers, createUserId } from "../_lib";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Data belum lengkap." }, { status: 400 });
  }

  const users = await readUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: createUserId(),
    name,
    email,
    passwordHash,
    role: role ?? "user",
  };

  users.push(newUser);
  await writeUsers(users);

  const { passwordHash: _, ...publicUser } = newUser;
  return NextResponse.json({ user: publicUser }, { status: 201 });
}
