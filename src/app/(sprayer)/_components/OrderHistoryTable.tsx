"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import OrderModal from "./OrderModal";
import { IOrder } from "@/models/Order";
import API from "@/utils/axiosClient";

const OrderHistoryTable: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  async function fetchOrders() {
    try {
      const res = await API.get<{ message: string; orders: IOrder[] }>(
        "/order/assigned"
      );
      setOrders(res.data.orders);
      setLoading(false);
    } catch (e) {
      return {
        message: "Failed to retrieve order",
        order : null
      };
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const completedOrders = orders.filter((order) => order.status === "COMPLETED");

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = completedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(completedOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to apply conditional styling based on status
  const getPaymentStatusClass = (paymentStatus: boolean) => {
    switch (paymentStatus) {
      case true:
        return "text-green-600 font-bold";
      case false:
        return "text-yellow-600 font-bold";
      default:
        return "";
    }
  };

  const getOrderStatusClass = (orderStatus: string) => {
    switch (orderStatus) {
      case "COMPLETED":
        return "text-green-600 font-bold";
      case "ASSIGNED":
        return "text-blue-600 font-bold";
      case "PENDING":
        return "text-yellow-600 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-center text-gray-500">Loading orders...</p>}

      {!loading && !error && completedOrders.length === 0 && (
        <p className="text-center text-gray-500">No orders available.</p>
      )}

      {/* Responsive table container */}
      {!loading && !error && completedOrders.length > 0 && (
        <div className="overflow-hidden">
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
                  <td className={`px-6 py-4 whitespace-normal text-sm ${getOrderStatusClass(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {order.totalCost} VND
                  </td>
                  {/* Payment Status, visible only on desktop */}
                  <td className={`hidden md:table-cell px-6 py-4 whitespace-normal text-sm ${getPaymentStatusClass(order.paymentStatus)}`}>
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

export default OrderHistoryTable;
