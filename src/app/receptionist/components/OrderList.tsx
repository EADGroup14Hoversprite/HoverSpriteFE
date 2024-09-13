"use client";

import React from 'react';

const mockOrders = [
  { id: 1, farmer: 'Nguyen Van A', cropType: 'Fruit', area: 5, dateTime: '2024-09-20 06:00', status: 'Pending' },
  { id: 2, farmer: 'Tran Thi B', cropType: 'Vegetable', area: 10, dateTime: '2024-09-21 08:00', status: 'Confirmed' },
  { id: 3, farmer: 'Le Dinh C', cropType: 'Cereal', area: 7, dateTime: '2024-09-22 16:00', status: 'Completed' }
];

const OrderList: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Order ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Farmer</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Crop</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Area</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">#{order.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.farmer}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.cropType}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.area} decare</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <span
                  className={`inline-block px-2 py-1 text-sm rounded-full ${
                    order.status === 'Pending' ? 'bg-yellow-300' :
                    order.status === 'Confirmed' ? 'bg-blue-300' :
                    'bg-gray-300'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button className="text-sm bg-green-500 text-white px-2 py-1 rounded mr-2">Assign Sprayer</button>
                <button className="text-sm bg-gray-500 text-white px-2 py-1 rounded">Mark as Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
