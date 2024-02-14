import EditUserForm from '@/components/edit-user-form';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import React from 'react';

interface UserEditPageProps {
  params: {
    id: string;
  };
}

export default async function UserEditPage(props: UserEditPageProps) {
  const id = parseInt(props.params.id);
  const user = await db.user.findFirst({
    where: { id },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
}
