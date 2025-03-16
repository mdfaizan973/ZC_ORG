import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { getSessionData, postData } from "../../utils/utils";
import BackButton from "../Cards/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { placeHolderImage } from "../../utils/uiUtils";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { QRCodeSVG } from "qrcode.react";
import { baseUrl2 } from "../../../config/confg";
export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    user_name: getSessionData("name"),
    user_email: getSessionData("email"),
    user_address: getSessionData("address"),
    user_pinCode: "",
    user_phone_no: "",
    payment_method: "cod",
  });

  const [orderSummary, setOrderSummary] = useState({});
  const [onlineOrderData, setOnlineOrderData] = useState({});
  const [showPaymentQR, setShowPaymentQR] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.dataForOrder) {
      setOrderSummary(location?.state?.dataForOrder);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listItems = orderSummary?.list_of_items?.map((ele) => ({
      prod_name: ele.title,
      prod_image: ele.image,
      prod_price: ele.discount_price_inr,
      prod_id: ele._id,
      prod_qty: 10,
      saler_name: ele.saler_name,
      saler_id: ele.saler_id,
    }));

    const updatedData = {
      ...formData,
      ...orderSummary,
      list_of_items: listItems,
      payment_status: formData.payment_method == "cod" ? "" : "paid",
      order_status: "Processing", // Processing -> shipped -> Out For Delivery -> Delivered
    };

    // and order_date from the backed
    if (formData.payment_method == "online") {
      setShowPaymentQR(true);
      setOnlineOrderData(updatedData);
    } else {
      makeOrder(updatedData);
    }
  };

  const makeOrder = async (userOrder) => {
    const userOrderDone = await postData(`${baseUrl2}/orders`, userOrder);
    if (userOrderDone) {
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    }
  };

  //   const handleDownloadInvoice = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/invoices/1234`);
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = `invoice-1234.pdf`;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //     } catch (error) {
  //       console.error("Error downloading invoice:", error);
  //     }
  //   };
  return (
    <>
      <Navbar />

      {/* <button onClick={handleDownloadInvoice}>Click to download</button> */}

      <div className="border-b p-2">
        <BackButton header="Complete Your Order" />
      </div>
      <div className="mb-2">
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
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentQR && (
        <OnlineOrder
          setShowPaymentQR={setShowPaymentQR}
          onlineOrderData={onlineOrderData}
          makeOrder={makeOrder}
        />
      )}
    </>
  );
}

const OnlineOrder = ({ setShowPaymentQR, onlineOrderData, makeOrder }) => {
  const steps = ["QR Code", "Pay Proof", "Done"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep < steps.length + 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const upiId = "6201855200@ibl";
  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=Md%20Faizaan&am=${
    Math.floor(onlineOrderData?.total_rupees) || 0
  }&cu=INR`;

  const phoneNumber = "6201855200"; // Change to your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleOnlinePayment = async () => {
    await makeOrder(onlineOrderData);
    setShowPaymentQR(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col bg-white rounded-lg w-[400px] shadow-md p-6">
          {/* Step Bar */}
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="p-2 rounded-full hover:bg-blue-50 text-blue-700"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setShowPaymentQR(false)}
              className="text-xl rounded-full hover:bg-red-50 text-red-700"
            >
              <BiX />
            </button>
          </div>
          {/* Step Labels */}
          <div className="flex  justify-between items-center w-full mt-2">
            {steps.map((step, index) => (
              <span
                key={index}
                className={`text-sm font-medium ${
                  index <= currentStep ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex  justify-between items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                    index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 ${
                      index < currentStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {currentStep == 0 && (
            <div className="bg-white rounded-2xl max-w-md overflow-hidden">
              <div className="flex justify-center items-center p-1 border-b border-t mt-1">
                <h2 className="text-md font-semibold">
                  Scan to Pay ₹{onlineOrderData?.total_rupees}
                </h2>
              </div>

              <div className="p-1 flex flex-col items-center">
                <>
                  <div className="bg-gray-100 rounded-xl p-4 mb-4 w-64 h-64 flex items-center justify-center">
                    <QRCodeSVG value={upiPaymentUrl} size={200} />
                  </div>
                  <p className="text-gray-600 text-center">
                    Scan this QR code with your UPI app to pay ₹
                    {onlineOrderData?.total_rupees}
                  </p>
                  <p className="text-sm font-semibold text-center text-blue-600">
                    After completing your payment,{" "}
                    <span className="text-red-500">click the button</span>{" "}
                    below!
                  </p>
                </>
              </div>
            </div>
          )}
          {currentStep == 1 && (
            <div className="flex flex-col items-center justify-center text-center  py-2">
              <div className="flex justify-center items-center p-1 border-b border-t mb-1">
                <h2 className="text-md font-semibold">
                  Scan to Share Payment ScreenShot! of ₹
                  {onlineOrderData?.total_rupees}.
                </h2>
              </div>
              <div className="bg-green-100 rounded-xl mb-4 w-64 h-64 flex items-center justify-center">
                <QRCodeSVG value={whatsappUrl} size={200} />
              </div>
              <p className="text-sm font-semibold text-blue-600">
                Your payment of
                <span className="text-red-500">
                  {" "}
                  ₹{onlineOrderData?.total_rupees}
                </span>{" "}
                has been done!
              </p>
            </div>
          )}
          {currentStep == 2 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
                <div className="flex flex-col bg-white items-center justify-center text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your <span className="font-semibold">Payment</span> of ₹
                    {onlineOrderData?.total_rupees} and{" "}
                    <span className="font-semibold">ScreenShot</span> has been
                    sent.
                  </p>
                  <button
                    onClick={handleOnlinePayment}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Next Button */}
          {/* <div className="flex justify-between"> */}
          <button
            onClick={handleNext}
            className="mt-1 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-400"
            disabled={currentStep === steps.length - 1}
          >
            Continue
          </button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
