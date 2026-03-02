import { prisma } from '../lib/prisma';

export async function getOrCreateUser(clerkId: string, email?: string) {
  let user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email: email ?? `${clerkId}@placeholder.local`,
      },
    });
  }
  return user;
}
