"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; 

export default function ReceptionistDashboard() {
  const [orders, setOrders] = useState([]);
  const [sprayers, setSprayers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSprayers, setLoadingSprayers] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order"); 
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch sprayers from API
  useEffect(() => {
    const fetchSprayers = async () => {
      try {
        const response = await fetch("/api/sprayer"); // Replace with your backend API endpoint
        const data = await response.json();
        setSprayers(data);
      } catch (error) {
        console.error("Error fetching sprayers:", error);
      } finally {
        setLoadingSprayers(false);
      }
    };

    fetchSprayers();
  }, []);

  const handleBookOrder = async () => {
    
  };

  const handleAssignSprayer = (orderId, sprayerId) => {
    
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Receptionist Dashboard</h1>

      {/* Book New Order Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Book New Order</h2>
        {/* Form for booking new order */}
        <Button variant="primary" onClick={handleBookOrder}>Confirm Order</Button>
      </section>

      {/* Order Management Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Management</h2>
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Crop: {order.crop}</p>
                  <p>Area: {order.area} decares</p>
                  <p>Date: {order.date} - Time: {order.time}</p>
                  <p>Status: {order.status}</p>
                </div>
                <Button variant="secondary" onClick={() => handleAssignSprayer(order.id, 1)}>
                  Assign Sprayer
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders available at the moment...</p>
        )}
      </section>

      {/* Sprayer Assignment Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Sprayers</h2>
        {loadingSprayers ? (
          <p>Loading sprayers...</p>
        ) : sprayers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
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
          <p className="text-gray-500">No sprayers available at the moment...</p>
        )}
      </section>

      {/* Order Status Tracking Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status Tracking</h2>
        {orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
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
          <p className="text-gray-500">No orders to track...</p>
        )}
      </section>
    </div>
  );
}
