const { PrismaClient } = require('@prisma/client');
async function test(url) {
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    await prisma.$connect();
    console.log('SUCCESS:', url);
    return true;
  } catch (e) {
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
async function run() {
  const urls = [
    'postgresql://postgres:root@localhost:5432/postgres',
    'postgresql://postgres:password@localhost:5432/postgres',
    'postgresql://postgres:postgres@localhost:5432/postgres',
    'postgresql://joeln@localhost:5432/postgres',
    'postgresql://joeln:joeln@localhost:5432/postgres',
    'postgresql://postgres@localhost:5432/postgres'
  ];
  for (const url of urls) {
    if (await test(url)) {
      console.log('Valid url is:', url);
      break;
    }
  }
}
run();
