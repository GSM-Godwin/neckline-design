"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MeasurementForm = () => {
  const [measurements, setMeasurements] = useState({
    shoulderWidth: '',
    bustCircumference: '',
    waistCircumference: '',
    hipCircumference: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(measurements as any).toString();
    router.push(`/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter Your Measurements</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder Width</label>
          <input
            type="number"
            name="shoulderWidth"
            min="0"
            value={measurements.shoulderWidth}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter shoulder width"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bust Circumference</label>
          <input
            type="number"
            name="bustCircumference"
            min="0"
            value={measurements.bustCircumference}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter bust circumference"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Waist Circumference</label>
          <input
            type="number"
            name="waistCircumference"
            min="0"
            value={measurements.waistCircumference}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter waist circumference"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hip Circumference</label>
          <input
            type="number"
            name="hipCircumference"
            min="0"
            value={measurements.hipCircumference}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter hip circumference"
            required
          />
        </div>
        <button
          type="submit"
          className="w-ful py-2 px-4 rounded-lg btn-submit transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MeasurementForm;
