'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the Report component
const Report = dynamic(
  () => import('@/components/admin/Report'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function ReportPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Report defaultDate={new Date()} />
    </Suspense>
  );
} 