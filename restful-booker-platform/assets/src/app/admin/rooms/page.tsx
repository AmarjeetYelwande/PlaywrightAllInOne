'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the RoomListings component
const RoomListings = dynamic(
  () => import('@/components/admin/RoomListings'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function RoomsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RoomListings />
    </Suspense>
  );
} 