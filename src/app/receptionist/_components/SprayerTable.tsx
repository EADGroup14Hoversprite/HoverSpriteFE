"use client";
import React, { useEffect, useState } from "react";
// import OrderModal from "./OrderModal";
import { ISprayer } from "@/models/Sprayers";
import API from "@/utils/axiosClient";
import { IOrder } from "@/models/Order";
import Button from "@/app/sprayer/_components/Button";

interface SprayerTableProp {
  order: IOrder;
}

const SprayerTable: React.FC<SprayerTableProp> = ({ order }) => {
  const [sprayers, setSprayers] = useState<ISprayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sprayersPerPage = 5;

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const diffToStartOfWeek = currentDay;

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - diffToStartOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const startOfWeekEpoch = Math.floor(startOfWeek.getTime());
  const endOfWeekEpoch = Math.floor(endOfWeek.getTime());

  async function fetchsprayers() {
    try {
      const res = await API.get<{ message: string; sprayers: ISprayer[] }>(
        `/order/${order.id}/suggested-sprayers?startDate=${startOfWeekEpoch}&endDate=${endOfWeekEpoch}`
      );
      setSprayers(res.data.sprayers);
      setLoading(false);
    } catch (e) {
      return {
        message: "Failed to retrieve order",
        order: null,
      };
    }
  }

  useEffect(() => {
    fetchsprayers();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * sprayersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - sprayersPerPage;
  const currentsprayers = sprayers.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sprayers.length / sprayersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  async function assignSprayer(values: { id: number }) {
    try {
      await API.post<{ message: string; dto: ISprayer }>(
        `/order/${order.id}/assign-sprayer`,
        {
            sprayerIds: [values.id],
        }
      );
    } catch (e) {
      return {
        message: "Failed to assign sprayer",
      };
    }
  }

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <p className="text-center text-gray-500">Loading sprayers...</p>
      )}

      {!loading && !error && sprayers.length === 0 && (
        <p className="text-center text-gray-500">No sprayers available.</p>
      )}

      {/* Responsive table container */}
      {!loading && !error && sprayers.length > 0 && (
        <div className="overflow-hidden">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Sprayer ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Phone Number
                </th>
                {/* Payment Status column, visible only on desktop */}
                <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Expertise
                </th>
                {/* Action column hidden on mobile */}
                <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-medium text-gray-900 bg-gray-100 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentsprayers.map((sprayer) => (
                <tr
                  key={sprayer.id}
                  className="border-b hover:bg-gray-50 transition ease-in-out duration-150 cursor-pointer md:cursor-default"
                  //   onClick={() => {
                  //     if (window.innerWidth < 768) openOrderModal(order); // Clickable on mobile
                  //   }} // Clickable row only on mobile
                >
                  <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                    {sprayer.id}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-normal text-sm`} //${getsprayerstatusClass(order.status)}
                  >
                    {sprayer.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    {sprayer.phoneNumber}
                  </td>
                  {/* Payment Status, visible only on desktop */}
                  <td
                    className={`hidden md:table-cell px-6 py-4 whitespace-normal text-sm`} //${getPaymentStatusClass(order.paymentStatus)}
                  >
                    {sprayer.expertise}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
                      onClick={() => assignSprayer(sprayer)}
                      text="Assign"
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
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-400"
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
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-400"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprayerTable;
