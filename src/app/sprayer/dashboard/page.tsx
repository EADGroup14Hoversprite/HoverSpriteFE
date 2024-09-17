"use client";
import React, { useState } from "react";
import Header from "../_components/Header";
import AssignedOrdersTable from "../_components/AssignedOrdersTable";
import OrderHistoryTable from "../_components/OrderHistoryTable";
import RoutePlanner from "../_components/RoutePlanner";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("assigned");

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative">
      {/* <Header setActiveTab={setActiveTab} /> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24">
        {activeTab === "assigned" && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Assigned Orders
            </h2>
            <AssignedOrdersTable />
          </section>
        )}

        {activeTab === "history" && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order History
            </h2>
            <OrderHistoryTable />
          </section>
        )}
        {activeTab === "route" && (
          <section
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-[calc(100vh-64px)]"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Route Planning
            </h2>
            <div className="pb-6 flex-1">
              <RoutePlanner />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
