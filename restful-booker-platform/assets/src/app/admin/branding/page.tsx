'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/admin/Loading';

// Dynamically import the Branding component
const Branding = dynamic(
  () => import('@/components/admin/Branding'),
  { 
    loading: () => <Loading />,
    ssr: false
  }
);

export default function BrandingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Branding />
    </Suspense>
  );
} 