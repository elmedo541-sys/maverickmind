import { prisma } from "@/lib/prisma";

/** All services, newest first, for the Services page. */
export async function getServices() {
  return prisma.service.findMany({ orderBy: { id: "desc" } });
}
