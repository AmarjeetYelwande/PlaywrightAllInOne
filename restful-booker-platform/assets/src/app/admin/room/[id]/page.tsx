'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the RoomDetails component
const RoomDetails = dynamic(
  () => import('@/components/admin/RoomDetails'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function RoomDetailsPage({params}: {params: Promise<{ id: string }>}) {
  // Use React.use() to unwrap the params Promise before accessing its properties
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  return (
    <Suspense fallback={<Loading />}>
      <RoomDetails id={id} />
    </Suspense>
  );
}
