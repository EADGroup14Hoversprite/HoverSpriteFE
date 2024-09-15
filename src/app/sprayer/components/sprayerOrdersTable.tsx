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


  // Could not fetch orders from the server, so I'm using a dummy data
  // const fetchOrders = async () => {
  //   try {
  //     //Token just for testing
  //     const token =
  //       "eyJhbGciOiJIUzM4NCJ9.eyJhdXRoUm9sZSI6IlJPTEVfVVNFUiIsInVzZXJSb2xlIjoiUk9MRV9TUFJBWUVSIiwic3ViIjoiMiIsImlhdCI6MTcyNjIyMDA5MywiZXhwIjoxNzI2MjIzNjkzfQ.3Ij3o-amwRA0UHueUaVM9KsJWFx5BgWew14SdYAXlJda3uWhGusv2xzFaA4GIMq5";
  //     const response = await fetch("http://localhost:8080/order/assigned", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch orders");
  //     }

  //     const data = await response.json();
  //     setOrders(data.orders);
  //     setLoading(false);
  //   } catch (err) {
  //     setError("Failed to load orders.");
  //     setLoading(false);
  //   }
  // };

  const fetchOrders = async () => {
    try {
      // Temporarily bypassing the fetch and returning a dummy order for testing
      const dummyOrders: Order[] = [
        {
          id: "12345",
          status: "ASSIGNED",
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
  
      setOrders(dummyOrders); // Set the dummy order data
      setLoading(false); // Update loading state
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

  const assignedOrders = orders.filter(order => order.status !== "COMPLETED");
  const completedOrders = orders.filter(order => order.status === "COMPLETED");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Assigned Orders</h1>
  
      {loading && <p>Loading orders...</p>}
  
      <div className="overflow-x-auto">
        {/* First table: Assigned Orders */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-8">
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
            {!loading && !error && assignedOrders.length > 0 ? (
              assignedOrders.map((order) => (
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

        {/* Second table: Order History */}
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
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
      </div>
    </div>
  );
};

export default SprayerOrderTable;
