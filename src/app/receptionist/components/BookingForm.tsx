"use client";

import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Fruit');
  const [area, setArea] = useState<number>(0);
  const totalCost = area * 30000;

  const crops = [
    { name: 'Fruit', image: '/path/to/fruit_image.png' },
    { name: 'Cereal', image: '/path/to/cereal_image.png' },
    { name: 'Vegetable', image: '/path/to/vegetable_image.png' }
  ];

  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
  };

  return (
    <div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">1</span>
          <span className="text-gray-500">Crop Selection</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-500">2</span>
          <span className="text-gray-500">Area Input</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-500">3</span>
          <span className="text-gray-500">Confirmation</span>
        </div>
      </div>

      {/* Crop Type Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Crop Type</h2>
        <p className="text-sm text-gray-500 mb-4">Choose the type of crop you want to spray</p>
        <div className="grid grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div
              key={crop.name}
              className={`border p-4 rounded-lg cursor-pointer text-center ${
                selectedCrop === crop.name ? 'border-blue-500 shadow-lg' : 'border-gray-300'
              }`}
              onClick={() => handleCropSelect(crop.name)}
            >
              <img src={crop.image} alt={crop.name} className="h-24 w-24 mx-auto mb-2" />
              <p className="text-lg font-medium">{crop.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Area Input */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Area (decare)</h2>
        <p className="text-sm text-gray-500 mb-4">Enter the size of the area you want to spray</p>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Enter area in decare"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded" disabled>Back</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default BookingForm;
