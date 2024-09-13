"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import OrderModal from "./OrderModal";

interface Order {
  id: string;
  status: string;
  bookerId: number;
  cropType: string;
  farmerName: string;
  farmerPhoneNumber: string;
  address: string;
  location: string;
  farmlandArea: number;
  desiredDate: string;
  totalCost: number;
  timeSlot: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

const SprayerOrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      //Token just for testing
      const token =
        "eyJhbGciOiJIUzM4NCJ9.eyJhdXRoUm9sZSI6IlJPTEVfVVNFUiIsInVzZXJSb2xlIjoiUk9MRV9TUFJBWUVSIiwic3ViIjoiMiIsImlhdCI6MTcyNjIyMDA5MywiZXhwIjoxNzI2MjIzNjkzfQ.3Ij3o-amwRA0UHueUaVM9KsJWFx5BgWew14SdYAXlJda3uWhGusv2xzFaA4GIMq5";
      const response = await fetch("http://localhost:8080/order/assigned", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false); 
  };

  const updateOrderInState = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Assigned Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Total cost
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.totalCost} VND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openOrderModal(order)} 
                      text="View details"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && selectedOrder && (
            <OrderModal order={selectedOrder} onClose={closeOrderModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default SprayerOrderTable;