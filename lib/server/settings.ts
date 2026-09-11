import { prisma } from "@/lib/prisma";

/** The single site-wide settings row (contact email, Messenger/Viber links). */
export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}
