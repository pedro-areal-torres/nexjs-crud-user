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

  revalidatePath('/');
  redirect('/');
}

export async function createUser(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Validate user input
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;

    if (typeof name !== 'string' || name.length < 3) {
      return {
        message: 'Name must be longer',
      };
    }

    if (typeof role !== 'string' || role.length < 3) {
      return {
        message: 'Role must be longer',
      };
    }

    // Create on the database
    const user = await db.user.create({
      data: {
        name,
        role,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return {
        message: 'Something went wrong',
      };
    }
  }

  // Refresh data stored on cache
  revalidatePath('/');
  // Redirect back to homepage
  redirect('/');
}
