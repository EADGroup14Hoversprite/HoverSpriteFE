"use client";
import React, { useEffect, useState } from "react";
import { IOrder } from "@/models/Order";
import API from "@/utils/axiosClient";

interface QRmodalProps {
  order: IOrder;
  onClose: () => void;
}

const QRmodal: React.FC<QRmodalProps> = ({ order, onClose }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const generateQR = async () => {
    try {
      const response = await API.get(`/order/${order.id}/generate-qr`, {
        responseType: "arraybuffer",
      });

      const qrCodeBlob = new Blob([response.data], { type: "image/png" });
      const qrCodeUrl = URL.createObjectURL(qrCodeBlob); 
      setQrCode(qrCodeUrl);
    } catch (e) {
      setError("Failed to generate QR code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQR();
  }, []);

  return (
    <div
      id="qr-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col items-center justify-center text-center">
        <h3 className="text-lg pt-5 font-semibold mb-4 text-gray-900">
          Show this QR code to the customer
        </h3>

        {loading ? (
          <p>Generating QR code...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <img src={qrCode as string} alt="QR Code" className="w-64 h-64" />
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
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
  );
};

export default QRmodal;
