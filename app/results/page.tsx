"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircleLoader } from 'react-spinners';

const DynamicResultsPage = dynamic(() => import('../../components/ResultsPageContent'), {
  ssr: false,
  loading: () => <CircleLoader />,
});

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<CircleLoader />}>
      <DynamicResultsPage />
    </Suspense>
  );
}
