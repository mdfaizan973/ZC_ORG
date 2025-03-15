import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackButton({ header = "" }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleGoBack}
          className="p-2 rounded-full hover:bg-green-50 text-green-700"
        >
          <FaArrowLeft />
        </button>
        {header && (
          <h1 className="text-2xl font-bold text-gray-800">{header}</h1>
        )}
      </div>
    </>
  );
}
