'use server';

import { db } from '@/db';
import { user } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function editUser(data: user) {
  const { id, name, role } = data;

  await db.user.update({
    where: { id },
    data: { name, role },
  });

  redirect(`/user/${id}`);
}

export async function deleteUser(id: number) {
  await db.user.delete({
    where: { id },
  });

  redirect('/');
}
