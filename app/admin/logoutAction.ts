"use server";

import { destroyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await destroyAdminSession();
  redirect("/admin/login");
}
