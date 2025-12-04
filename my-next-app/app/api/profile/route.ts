import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers } from "../auth/_lib"; // Menggunakan helper yang sudah ada

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Middleware sederhana untuk memverifikasi token
async function getUserFromToken(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const users = await readUsers();
    return users.find((u) => u.id === decoded.sub) || null;
  } catch {
    return null;
  }
}

// GET: Ambil data profile
export async function GET(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Jangan kirim password hash ke frontend
  const { passwordHash, ...safeUser } = user as any;
  return NextResponse.json(safeUser);
}

// PUT: Update data profile
export async function PUT(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { username, description, profilePic, newPassword } = body;

  const users = await readUsers();
  const index = users.findIndex((u) => u.id === user.id);

  if (index === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Update data basic
  if (username) users[index].name = username;
  if (description !== undefined) (users[index] as any).description = description; // Menambah field deskripsi
  if (profilePic !== undefined) (users[index] as any).profilePic = profilePic;   // Menambah field foto

  // Update Password jika diminta
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    users[index].passwordHash = await bcrypt.hash(newPassword, salt);
  }

  await writeUsers(users);

  const { passwordHash, ...updatedUser } = users[index] as any;
  return NextResponse.json({ message: "Profil berhasil diperbarui", user: updatedUser });
}