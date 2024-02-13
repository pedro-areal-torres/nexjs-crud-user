import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

db.user.create({
  data: {
    name: 'Pedro',
    role: 'Developer',
  },
});
