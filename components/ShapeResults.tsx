"use client";

import { useEffect, useState } from 'react';

interface ShapeResultsProps {
  shapeType: string;
  necklineDesign: string;
  widerShoulders: boolean | null;
  slimmerHips: boolean | null;
  fullerBust: boolean | null;
}

const ShapeResults: React.FC<ShapeResultsProps> = ({ 
  shapeType, 
  necklineDesign, 
  widerShoulders, 
  slimmerHips, 
  fullerBust 
}) => {
  const [styleGuide, setStyleGuide] = useState<string>('');
  const [fabricPatterns, setFabricPatterns] = useState<string>('');

  useEffect(() => {
    // You can now fetch styleGuide and fabricPatterns based on the shapeType
    setStyleGuide('Fitted tops and A-line skirts');
    setFabricPatterns('Solid colors, small prints');
  }, [shapeType]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h1 className='text-xl md:text-2xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 to-blue-700'>Blouse Recommender</h1>
      <h2 className="text-lg md:text-2xl font-bold mb-2 text-center text-gray-800">Your Body Shape is {shapeType}</h2>
      <div className="space-y-6">
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-700">Style Guide:</h3>
          <p className="text-gray-600">{styleGuide}</p>
        </div> */}
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-700">Fabric Patterns:</h3>
          <p className="text-gray-600">{fabricPatterns}</p>
        </div> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">You also have:</h3>
          <ul className="text-gray-600 list-disc list-inside">
            {widerShoulders && <li>a wide shoulder</li>}
            {slimmerHips && <li>slightly slim hips</li>}
            {fullerBust && <li>full bust</li>}
          </ul>
        </div>
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-700">Recommended Neckline Design:</h3>
          <p className="text-gray-600">{necklineDesign}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ShapeResults;
