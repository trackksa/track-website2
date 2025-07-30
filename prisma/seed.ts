import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@soundbeat.com" },
    update: {},
    create: {
      email: "admin@soundbeat.com",
      password: hashedPassword,
      name: "Soundbeat Admin",
    },
  });

  console.log("✅ Admin created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
