import { prisma } from "@/lib/prisma";

/** Active hero slides for the homepage carousel, in display order. */
export async function getActiveSlides() {
  return prisma.slide.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });
}
