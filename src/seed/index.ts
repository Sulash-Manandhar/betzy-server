import fs from "fs";

import { memberships_levels } from "./config";
import prisma from "@/config/database";
import { FILE_UPLOAD_DESTINATION } from "@/core/constant";

async function main() {
  if (!fs.existsSync(FILE_UPLOAD_DESTINATION)) {
    fs.mkdirSync(FILE_UPLOAD_DESTINATION, { recursive: true });
  }

  await prisma.membership.createMany({
    data: memberships_levels,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
