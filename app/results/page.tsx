"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircleLoader } from 'react-spinners';

const DynamicResultsPage = dynamic(() => import('../../components/ResultsPageContent'), {
  ssr: false,
  loading: () => <div className='flex flex-col items-center justify-center '><CircleLoader /> <p>modelling suitable neckline designs...</p></div>,
});

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div className='flex flex-col items-center justify-center '><CircleLoader /> <p>modelling suitable neckline designs...</p></div>}>
      <DynamicResultsPage />
    </Suspense>
  );
}
