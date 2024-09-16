"use client";
import React, { useState } from "react";
import Header from "../_components/Header";
import AssignedOrdersTable from "../_components/AssignedOrdersTable";
import OrderHistoryTable from "../_components/OrderHistoryTable";
import RoutePlanner from "../_components/RoutePlanner"; // Import the route component

export default function Page() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<string>("assigned");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with prop to set the active tab */}
      <Header setActiveTab={setActiveTab} />

      {/* Main Content with padding to account for fixed header */}
      <main className="container mx-auto px-4 py-8 pt-20"> {/* Add pt-20 to offset header */}
        {activeTab === "assigned" && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assigned Orders</h2>
            <AssignedOrdersTable />
          </section>
        )}

        {activeTab === "history" && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
            <OrderHistoryTable />
          </section>
        )}

        {activeTab === "route" && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Route Planning</h2>
            <RoutePlanner />
          </section>
        )}
      </main>
    </div>
  );
}
