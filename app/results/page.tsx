"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ShapeResults from '../../components/ShapeResults';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [shapeType, setShapeType] = useState<string | null>(null);

  useEffect(() => {
    const fetchShapeType = async () => {
      if (searchParams) {
        const measurements = {
          shoulderWidth: searchParams.get('shoulderWidth'),
          bustCircumference: searchParams.get('bustCircumference'),
          waistCircumference: searchParams.get('waistCircumference'),
          hipCircumference: searchParams.get('hipCircumference'),
        };

        const res = await fetch('/api/shape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(measurements),
        });

        const data = await res.json();
        setShapeType(data.shapeType);
      }
    };

    fetchShapeType();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {shapeType ? <ShapeResults shapeType={shapeType} /> : "Loading..."}
    </div>
  );
};

// Wrap the component with a Suspense boundary
export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPage />
    </Suspense>
  );
}
