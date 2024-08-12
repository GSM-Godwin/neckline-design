"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners'
import ShapeResults from './ShapeResults';

const ResultsPageContent = () => {
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
      {shapeType ? <ShapeResults shapeType={shapeType} /> : <div className='flex flex-col items-center justify-center '><CircleLoader size="10vw" /> <p className='text-[#0a0a0a]7'>modelling suitable neckline designs...</p></div>}
    </div>
  );
};

export default ResultsPageContent;
