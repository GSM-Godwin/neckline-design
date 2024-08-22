"use client";

import { useEffect, useState } from 'react';

const ShapeResults = ({ shapeType, necklineDesign }: { shapeType: string, necklineDesign: string }) => {
  const [styleGuide, setStyleGuide] = useState<string>('');
  const [fabricPatterns, setFabricPatterns] = useState<string>('');

  useEffect(() => {
    // You can now fetch styleGuide and fabricPatterns based on the shapeType
    setStyleGuide('Fitted tops and A-line skirts');
    setFabricPatterns('Solid colors, small prints');
  }, [shapeType]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h1 className='text-2xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 to-blue-700'>Blouse Recommender</h1>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Shape Type: {shapeType}</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Recommended Neckline Design:</h3>
          <p className="text-gray-600">{necklineDesign}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Style Guide:</h3>
          <p className="text-gray-600">{styleGuide}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Fabric Patterns:</h3>
          <p className="text-gray-600">{fabricPatterns}</p>
        </div>
      </div>
    </div>
  );
};

export default ShapeResults;
