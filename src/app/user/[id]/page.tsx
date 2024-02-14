import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as actions from '@/actions';

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailsPage(props: UserDetailsPageProps) {
  //await new Promise((r) => setTimeout(r, 2000)); - Artificial

  const user = await db.user.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!user) {
    return notFound();
  }

  const deleteUserAction = actions.deleteUser.bind(null, user.id);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-xl font-bold'>{user.name}</h1>
        <div className='flex flex-row gap-2'>
          <Link className='rounded border p-2' href={`/user/${user.id}/edit`}>
            Edit
          </Link>
          <form action={deleteUserAction}>
            <button className='rounded border p-2'>Delete</button>
          </form>
          <Link href={'/'} className='border rounded p-2'>
            Back
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div>Role: {user.role}</div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await db.user.findMany();

  return users.map((user) => {
    return {
      id: user.id.toString(),
    };
  });
}
