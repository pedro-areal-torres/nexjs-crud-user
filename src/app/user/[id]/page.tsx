import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-xl font-bold'>{user.name}</h1>
        <div className='flex flex-row gap-2'>
          <Link className='rounded border p-2' href={`/user/${user.id}/edit`}>
            Edit
          </Link>
          <button className='rounded border p-2'>Delete</button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div>Role: {user.role}</div>
      </div>
    </div>
  );
}
