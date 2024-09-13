"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

export default function ReceptionistDashboard() {
  // Mock data for orders and sprayers
  const [orders, setOrders] = useState([
    { id: 1, crop: "Cereal", area: 5, date: "2024-09-15", time: "07:00", status: "Pending", assignedSprayerId: null },
    { id: 2, crop: "Fruit", area: 10, date: "2024-09-16", time: "06:00", status: "Assigned", assignedSprayerId: 1 },
  ]);
  
  const [sprayers, setSprayers] = useState([
    { id: 1, name: "John Doe", expertise: "Expert" },
    { id: 2, name: "Jane Smith", expertise: "Adept" },
  ]);
  
  const [newOrder, setNewOrder] = useState({
    crop: "",
    area: "",
    date: "",
    time: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleBookOrder = () => {
    const newId = orders.length + 1;
    setOrders((prevOrders) => [
      ...prevOrders,
      { ...newOrder, id: newId, status: "Pending" },
    ]);
    alert("Order booked successfully!");
  };

  const handleAssignSprayer = (orderId, sprayerId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Assigned", assignedSprayerId: sprayerId } : order
      )
    );
    alert("Sprayer assigned successfully!");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Receptionist Dashboard</h1>

      {/* Book New Order Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Book New Order</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="crop"
              placeholder="Type of Crop (Fruit, Cereal, Vegetable)"
              className="w-full px-4 py-2 border rounded-lg"
              value={newOrder.crop}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="area"
              placeholder="Farmland Area (in decares)"
              className="w-full px-4 py-2 border rounded-lg"
              value={newOrder.area}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 border rounded-lg"
              value={newOrder.date}
              onChange={handleInputChange}
            />
            <input
              type="time"
              name="time"
              className="w-full px-4 py-2 border rounded-lg"
              value={newOrder.time}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Farmer's Phone Number"
              className="w-full px-4 py-2 border rounded-lg"
              value={newOrder.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="primary" onClick={handleBookOrder}>
            Confirm Order
          </Button>
        </form>
      </section>

      {/* Order Management Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Management</h2>
        {orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Crop: {order.crop}</p>
                  <p>Area: {order.area} decares</p>
                  <p>Date: {order.date} - Time: {order.time}</p>
                  <p>Status: {order.status}</p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleAssignSprayer(order.id, 1)} // Just assigning sprayer 1 for simplicity
                >
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
        {sprayers.length > 0 ? (
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
