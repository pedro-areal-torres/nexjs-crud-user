import React from 'react';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function UserCreatePage() {
  async function createUser(formData: FormData) {
    // Create server action
    'use server';

    // Validate user input
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;

    // Create on the database
    const user = await db.user.create({
      data: {
        name,
        role,
      },
    });

    // Redirect back to homepage
    redirect('/');
  }

  return (
    <form action={createUser}>
      <h3 className='font-bold'>Create User</h3>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <label htmlFor='name'>Name</label>
          <input name='name' className='border rounded p-2 w-full' />
        </div>
        <div className='flex gap-2'>
          <label htmlFor='role'>Role</label>
          <input name='role' className='border rounded p-2 w-full' />
        </div>
        <div className='flex flex-row gap-2'>
          <Link
            href='/'
            className='w-full rounded bg-slate-300 text-center align-middle p-2'
          >
            Back
          </Link>
          <button type='submit' className='rounded p-2 bg-blue-400 w-full'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
