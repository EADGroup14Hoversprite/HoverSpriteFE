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

const OrderHistoryTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const dummyOrders: Order[] = [
        {
          id: "12345",
          status: "COMPLETED",
          bookerId: 1,
          cropType: "Rice",
          farmerName: "John Doe",
          farmerPhoneNumber: "1234567890",
          address: "123 Main Street",
          location: "Somewhere, Country",
          farmlandArea: 5,
          desiredDate: "2024-09-16",
          totalCost: 500000,
          timeSlot: "Morning",
          paymentMethod: "Credit Card",
          paymentStatus: "Payment accepted",
          createdAt: "2024-09-10",
          updatedAt: "2024-09-12",
        },
      ];

      setOrders(dummyOrders);
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

  const completedOrders = orders.filter((order) => order.status === "COMPLETED");

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading orders...</p>}
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
              Payment status
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && !error && completedOrders.length > 0 ? (
            completedOrders.map((order) => (
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
                  {order.paymentStatus ? "Payment accepted" : "Ongoing"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openOrderModal(order)}
                    text="View details"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                {error ? "Could not retrieve orders..." : "No orders available."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={closeOrderModal} />
      )}
    </div>
  );
};

export default OrderHistoryTable;
