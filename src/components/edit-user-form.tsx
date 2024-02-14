'use client';

import type { user } from '@prisma/client';
import * as actions from '@/actions';
import { useState } from 'react';

interface EditUserFormProps {
  user: user;
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const editUserAction = actions.editUser.bind(null, {
    id: user.id,
    name,
    role,
  });

  return (
    <div className='flex flex-col'>
      <div className='text-xl font-bold p-2'>
        <h1>Editing {user.id}</h1>
      </div>
      <div className='flex flex-col'>
        <form className='flex flex-col gap-2' action={editUserAction}>
          <div className='flex flex-row gap-2 item-center'>
            <label htmlFor='name'>Name</label>
            <input
              className='border rounded p-1'
              name='name'
              type='text'
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <label htmlFor='role'>Role</label>
            <input
              className='border rounded p-1'
              name='role'
              type='text'
              defaultValue={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <button type='submit' className='bg-blue-400 border rounded p-2'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
