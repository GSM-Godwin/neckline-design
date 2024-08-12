"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the component that uses `useSearchParams`
const DynamicResultsPage = dynamic(() => import('../../components/ResultsPageContent'), {
  ssr: false, // Disable SSR for this component
  loading: () => <div>Loading...</div>, // Fallback content during loading
});

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicResultsPage />
    </Suspense>
  );
}
