'use client';

import React from 'react';
import Link from 'next/link';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';

export default function UserCreatePage() {
  const [formState, action] = useFormState(actions.createUser, { message: '' });

  return (
    <form action={action}>
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

        {formState.message ? (
          <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>
            {formState.message}
          </div>
        ) : null}
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
