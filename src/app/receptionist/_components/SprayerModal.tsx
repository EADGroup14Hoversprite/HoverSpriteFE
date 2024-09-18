"use client";
import React, { useState } from "react";
import { IOrder } from "@/models/Order";
import SprayerTable from "./SprayerTable";


interface SprayerModalProp {
  order: IOrder;
  onClose: () => void;
}

const SprayerModal: React.FC<SprayerModalProp> = ({ order, onClose }) => {
  return (
    <div
      id="order-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
    >
      <div className="relative w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Suggested sprayers</h3>
          <div className="flex space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
          
        </div>

        {/* Modal Body with Grid Layout */}
        <div className="">

          <SprayerTable order = {order}/>
          </div>

       
      </div>
    </div>
  );
};

export default SprayerModal;
