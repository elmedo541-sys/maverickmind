import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin account ---
  // Change these before running, or change the password right after
  // logging in for the first time. Username/password come from env
  // vars so you don't have to commit real credentials to the repo.
  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "changeme123";

  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {},
    create: { username, password: hashed },
  });

  console.log(`Admin user ready -> username: "${username}"`);
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(`Using default password "changeme123" - please change it!`);
  }

  // --- Starter categories & brands (optional, safe to edit/remove) ---
  const categories = [
    "Fire Alarm Systems",
    "CCTV",
    "PoE Switches",
    "Video Recorders",
    "Wires & Pipes",
  ];

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { categoryName },
      update: {},
      create: { categoryName },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
