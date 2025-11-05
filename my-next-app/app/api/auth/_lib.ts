import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
};

export async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data) as User[];
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
      await fs.writeFile(DB_PATH, "[]");
      return [];
    }
    throw err;
  }
}

export async function writeUsers(users: User[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export function createUserId() {
  return randomUUID();
}
