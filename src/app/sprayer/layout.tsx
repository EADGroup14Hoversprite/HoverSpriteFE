"use client";
import { UserRole } from "@/types/role";
import { notFound } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import Header from "@/app/sprayer/_components/Header";
import AssignedOrdersTable from "@/app/sprayer/_components/AssignedOrdersTable";
import OrderHistoryTable from "@/app/sprayer/_components/OrderHistoryTable";
import RoutePlanner from "@/app/sprayer/_components/RoutePlanner";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "@/types/user";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUserStore();
  const clientCookie = useCookies().get("sessionToken");

  useEffect(() => {
    if (clientCookie) {
      const decodeData = jwtDecode<JWTPayload>(clientCookie!);
      if (decodeData.userRole !== UserRole.ROLE_SPRAYER.toString()) {
        notFound();
      }
    }
  }, [clientCookie]);

  const [activeTab, setActiveTab] = useState<string>("assigned");

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative">
      <Header setActiveTab={setActiveTab} />

      {/* Main Content */}
      {/* <main className="container mx-auto px-4 pt-24">
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
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ height: "calc(100vh - 6rem)" }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Route Planning
            </h2>
            <div className="h-full pb-6">
              <RoutePlanner />
            </div>
          </section>
        )}
      </main> */}
      {children}
    </div>
  );
}
