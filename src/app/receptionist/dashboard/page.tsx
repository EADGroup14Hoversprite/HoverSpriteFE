"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

export default function ReceptionistDashboard() {
  const [orders, setOrders] = useState([]); // Placeholder for orders
  const [sprayers, setSprayers] = useState([]); // Placeholder for sprayers

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Receptionist Dashboard</h1>

      {/* Order Management Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Order Management</h2>
          <Button variant="primary">Book New Order</Button>
        </div>
        {orders.length > 0 ? (
          <ul className="mt-4 divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Crop: {order.crop}</p>
                    <p>Area: {order.area} decares</p>
                  </div>
                  <p className="text-gray-500">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No orders available at the moment...</p>
        )}
      </section>

      {/* Sprayer Assignment Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold">Sprayer Assignment</h2>
        {sprayers.length > 0 ? (
          <ul className="mt-4 divide-y divide-gray-200">
            {sprayers.map((sprayer) => (
              <li key={sprayer.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Name: {sprayer.name}</p>
                    <p>Expertise: {sprayer.expertise}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No sprayers available at the moment...</p>
        )}
      </section>

      {/* Order Status Tracking Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold">Order Status Tracking</h2>
        {orders.length > 0 ? (
          <ul className="mt-4 divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No orders to track...</p>
        )}
      </section>
    </div>
  );
}
