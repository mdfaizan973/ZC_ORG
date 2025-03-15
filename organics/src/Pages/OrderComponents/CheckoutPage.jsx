import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { getSessionData } from "../../utils/utils";
import BackButton from "../Cards/BackButton";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    user_name: getSessionData("name"),
    user_email: getSessionData("email"),
    user_address: getSessionData("address"),
    user_pinCode: "",
    user_phone_no: "",
    payment_method: "cod",
  });

  const [reviewData, setReviewData] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.dataForOrder) {
      setReviewData(location?.state?.dataForOrder?.list_of_items);
      setOrderSummary(location?.state?.dataForOrder);
    }
  }, [location]);

  console.log(orderSummary);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      ...orderSummary,
    };
    // add payment_status and order_status
    // and order_date from the backed
    console.log("Form Data:", updatedData);
  };

  return (
    <>
      <Navbar />
      <BackButton />
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
                          You&apos;ll be redirected to our secure payment
                          gateway after clicking &quot;Place Order&quot;
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
                <div className="bg-gray-50 py-4 px-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Secure Checkout
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Fast Delivery
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
