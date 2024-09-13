//COULD ALSO ADD THE MAP HERE
import React from "react";
import Button from "./Button";

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

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  return (
    <div
      id="order-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-4xl bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
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
        <div className="p-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Booker ID:</strong> {order.bookerId}
          </p>
          <p>
            <strong>Crop Type:</strong> {order.cropType}
          </p>
          <p>
            <strong>Farmer Name:</strong> {order.farmerName}
          </p>
          <p>
            <strong>Farmer Phone Number:</strong> {order.farmerPhoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          {/* <p><strong>Location:</strong> {order.location}</p> */}
          <p>
            <strong>Farmland Area:</strong> {order.farmlandArea} acres
          </p>
          <p>
            <strong>Desired Date:</strong> {order.desiredDate}
          </p>
          <p>
            <strong>Total Cost:</strong> ${order.totalCost}
          </p>
          <p>
            <strong>Time Slot:</strong> {order.timeSlot}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Created At:</strong> {order.createdAt}
          </p>
          <p>
            <strong>Updated At:</strong> {order.updatedAt}
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => ""} 
          text="Accept order"
        />
      </div>
    </div>
  );
};

export default OrderModal;