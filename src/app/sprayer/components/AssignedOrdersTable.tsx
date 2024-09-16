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

const AssignedOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

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

  const assignedOrders = orders.filter((order) => order.status !== "COMPLETED");

  
  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = assignedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(assignedOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-center text-gray-500">Loading orders...</p>}

      {!loading && !error && assignedOrders.length === 0 && (
        <p className="text-center text-gray-500">No orders available.</p>
      )}

      {/* Responsive table container */}
      {!loading && !error && assignedOrders.length > 0 && (
        <div className="overflow-hidden">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Total Cost
                </th>
                {/* Payment Status column, visible only on desktop */}
                <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Payment Status
                </th>
                {/* Action column hidden on mobile */}
                <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition ease-in-out duration-150 cursor-pointer md:cursor-default"
                  onClick={() => {
                    if (window.innerWidth < 768) openOrderModal(order); // Clickable on mobile
                  }} // Clickable row only on mobile
                >
                  <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {order.totalCost} VND
                  </td>
                  {/* Payment Status, visible only on desktop */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {order.paymentStatus}
                  </td>
                  {/* Show the action button only on desktop */}
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
                      onClick={() => openOrderModal(order)}
                      text="View details"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              className={`px-4 py-2 bg-gray-300 rounded-md text-sm font-medium ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 bg-gray-300 rounded-md text-sm font-medium ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal for viewing details */}
      {isModalOpen && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={closeOrderModal} />
      )}
    </div>
  );
};

export default AssignedOrdersTable;