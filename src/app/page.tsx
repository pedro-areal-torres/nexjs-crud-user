import { db } from '@/db';
import Link from 'next/link';

export default async function Home() {
  const users = await db.user.findMany();

  const renderedUsers = users.map((user) => {
    return (
      <Link
        key={user.id}
        href={`/user/${user.id}`}
        className='flex justify-between items-center p-2 border rounded'
      >
        <div>
          {user.name} | {user.role}
        </div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div className='flex flex-col gap-4 p-2'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-bold'>Users</h1>
        <Link href={'/user/new'} className='border rounded p-2'>
          New
        </Link>
      </div>
      <div className='flex flex-col gap-2'>{renderedUsers}</div>
    </div>
  );
}
