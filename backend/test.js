const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const invitations = await prisma.invitation.findMany({ take: 5 });
  console.log(invitations);
}
main().catch(console.error).finally(() => prisma.$disconnect());
