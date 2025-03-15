import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { placeHolderImage } from "../../utils/uiUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidBabyCarriage } from "react-icons/bi";

export default function ProdReview() {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.cartReview) {
      setReviewData(location?.state?.cartReview?.list_of_items);
      setOrderSummary(location?.state?.cartReview);
    }
  }, [location]);
  const navigate = useNavigate();

  const handleOrderItems = () => {
    navigate("/checkout", { state: { dataForOrder: orderSummary } });
  };

  return (
    <div className="min-h-screen mt-4">
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        {reviewData?.length > 0 ? (
          <div className="md:flex md:gap-2">
            {/* Product List - Takes more width on desktop */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-0 md:flex-1">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <FiShoppingBag className="mr-2" /> Your Items
              </h2>

              <div className="space-y-4 mb-4">
                {reviewData?.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center border-b pb-4"
                  >
                    <img
                      src={product.image || placeHolderImage}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.category}</h3>
                      <p className="font-sm">{product.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold">
                          ₹
                          {product.discount_price_inr?.toFixed(2) *
                            product.quantity}{" "}
                          <span className="text-[10px] underline">
                            {product.discount_price_inr?.toFixed(2)}
                          </span>
                        </span>
                        <div className="text-sm text-gray-600">
                          Qty: {product.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-black-700 mb-4 flex justify-between items-center">
                <span className="flex items-center">
                  <BiSolidBabyCarriage className="mr-2" /> Delivery by
                </span>
                <span>
                  ({new Date(orderSummary?.delivery_date)?.toDateString()})
                </span>
              </h2>
            </div>

            {/* Order Summary - Fixed width on desktop */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-80">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Order Summary
              </h2>
              {/* Delivery Charge */}
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Delivery Charge</span>
                <span className="font-medium">
                  {/* {deliveryCharge === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${deliveryCharge.toFixed(2)}`
                  )} */}
                  ₹ 100
                </span>
              </div>
              {/* Price Details */}
              <div className="py-3 border-b">
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => setShowPriceDetails(!showPriceDetails)}
                >
                  <span className="font-medium">Price Details</span>
                  {showPriceDetails ? (
                    <FiChevronDown className="text-gray-600" />
                  ) : (
                    <FiChevronRight className="text-gray-600" />
                  )}
                </button>

                {showPriceDetails && (
                  <div className="mt-3 space-y-2 text-sm">
                    {reviewData.map((product) => (
                      <div
                        key={`detail-${product._id}`}
                        className="flex justify-between"
                      >
                        <span className="text-gray-600">
                          {product.title} (x{product.quantity})
                        </span>
                        <span className="font-medium">
                          ₹
                          {(
                            product.discount_price_inr * product.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {" "}
                        ₹{orderSummary.total_rupees?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-medium">
                        {/* {deliveryCharge === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${deliveryCharge.toFixed(2)}`
                        )} */}
                        ₹ 100
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* Total */}
              <div className="hidden sm:flex justify-between items-center py-4 font-bold text-lg">
                <span>Total</span>
                <span className="text-green-700">
                  ₹{orderSummary.total_rupees?.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => handleOrderItems()}
                className="hidden sm:flex w-full justify-center items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 mt-4"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-600 text-xl">
              You haven’t shopped for anything yet. Start shopping now!
            </p>
            <button
              onClick={() => navigate("/organicsproducts")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 mt-4"
            >
              Click To Shop!
            </button>
          </div>
        )}
      </div>

      {/* Mobile-only Continue Button - Fixed at bottom */}
      <div className="md:hidden sticky bottom-0 p-2 bg-white border-t shadow-md">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-green-700 text-xl">
            ₹{orderSummary.total_rupees?.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => handleOrderItems()}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
