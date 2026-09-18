'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the MessageList component
const MessageList = dynamic(
  () => import('@/components/admin/MessageList'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function MessagesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MessageList />
    </Suspense>
  );
}