import { useState } from "react";
import Navbar from "../../Components/Navbar";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_address: "",
    user_pinCode: "",
    user_phone_no: "",
    payment_method: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Checkout Progress */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Shipping Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Please enter your shipping details
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="user_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="user_email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="user_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="user_address"
                        name="user_address"
                        value={formData.user_address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="user_pinCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="user_pinCode"
                        name="user_pinCode"
                        value={formData.user_pinCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="10001"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="user_phone_no"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="user_phone_no"
                        name="user_phone_no"
                        value={formData.user_phone_no}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                          formData.payment_method === "cod"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, payment_method: "cod" })
                        }
                      >
                        <input
                          id="cod"
                          name="payment_method"
                          type="radio"
                          value="cod"
                          checked={formData.payment_method === "cod"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.payment_method === "cod"
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.payment_method === "cod" && (
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Cash on Delivery
                            </p>
                            <p className="text-sm text-gray-500">
                              Pay when you receive your order
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div
                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                          formData.payment_method === "online"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, payment_method: "online" })
                        }
                      >
                        <input
                          id="online"
                          name="payment_method"
                          type="radio"
                          value="online"
                          checked={formData.payment_method === "online"}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.payment_method === "online"
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.payment_method === "online" && (
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Online Payment
                            </p>
                            <p className="text-sm text-gray-500">
                              Credit/Debit Card, UPI, Wallet
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-1">
                          <div className="w-8 h-5 bg-blue-600 rounded"></div>
                          <div className="w-8 h-5 bg-red-500 rounded"></div>
                          <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {formData.payment_method === "online" && (
                      <div className="mt-4 p-5 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-700 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          You'll be redirected to our secure payment gateway
                          after clicking "Place Order"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium text-lg shadow-md"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
