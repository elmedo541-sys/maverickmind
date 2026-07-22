"use server";

import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export type LoginState = {
  error: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = (formData.get("username") as string || "").trim();
  const password = (formData.get("password") as string || "");

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }

  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) {
    return { error: "Invalid username or password." };
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await createAdminSession(admin.username);
  redirect("/admin/dashboard");
}
