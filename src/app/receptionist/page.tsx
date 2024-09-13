"use client";

import React from 'react';
import Sidebar from './components/sidebar';
import BookingForm from './components/BookingForm';
import OrderList from './components/OrderList';

const ReceptionistPage: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8">Receptionist Dashboard</h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Booking Form */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <BookingForm />
          </div>

          {/* Right: Order List */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistPage;
