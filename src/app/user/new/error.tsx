'use client';

import React from 'react';

interface UserErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function UserErrorPage({ error }: UserErrorPageProps) {
  return <div>{error.message}</div>;
}
