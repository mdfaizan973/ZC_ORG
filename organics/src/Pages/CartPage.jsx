import Navbar from "../Components/Navbar";

import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaLeaf,
  FaShoppingBag,
  FaArrowRight,
  FaCreditCard,
  FaTruck,
  FaShoppingCart,
} from "react-icons/fa";
import { deleteData, fetchData, getSessionData } from "../utils/utils";
import { baseUrl2 } from "../../config/confg";
import { useNavigate } from "react-router-dom";
import CartLoading from "./LoadingUI/CartLoading";
import { placeHolderImage } from "../utils/uiUtils";

export default function CartPage() {
  const navigate = useNavigate();
  const [shippingCharge, setShippingChnarge] = useState(50);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [showEmptyCart, setShowEmptyCart] = useState(false);

  useEffect(() => {
    loadCartProduts();
  }, []);

  const loadCartProduts = async () => {
    setCartLoading(true);
    setShowEmptyCart(false);
    const userId = getSessionData("_id");
    const cartProd = await fetchData(`${baseUrl2}/cart/${userId}`);
    setCartLoading(false);
    if (cartProd.length > 0) {
      setCartItems(cartProd);
    } else {
      setShowEmptyCart(true);
    }
  };

  const removeItem = async (id) => {
    await deleteData(`${baseUrl2}/cart/${id}`);
    setCartItems(cartItems.filter((item) => item._id !== id));
    // loadCartProduts();
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.discount_price_inr * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal() || 0; // Ensure subtotal is a number
    const tax = calculateTax() || 0; // Ensure tax is a number
    const shipping = subtotal < 500 ? shippingCharge : 0; // Ensure shipping is a number

    return Number(subtotal) + Number(tax) + Number(shipping); // Convert to number just in case
  };

  const buyNowItem = (item) => {
    const discount_price_inr = item.discount_price_inr * item.quantity;
    const shipping = discount_price_inr < 500 ? shippingCharge : 0;
    const tax = 0.07 * discount_price_inr || 0;

    const total = Number(discount_price_inr) + Number(tax) + Number(shipping);
    handleGoToOrder([item], total);
  };

  const handleGoToOrder = (cartData, totalPrice) => {
    const prepare_data = {};
    prepare_data["list_of_items"] = cartData;
    prepare_data["delivery_options"] = getDeliveryOption(shippingCharge);
    prepare_data["total_rupees"] = totalPrice;
    prepare_data["user_id"] = getSessionData("_id");
    prepare_data["delivery_date"] = getFutureDate(
      getDeliveryOption(shippingCharge) == "standard" ? 4 : 1
    );

    console.log(120, prepare_data);
    navigate("/order-review", { state: { cartReview: prepare_data } });
  };

  const getFutureDate = (daysAhead) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    return futureDate.toISOString();
  };

  const getDeliveryOption = (shipStatus) => {
    return shipStatus == "50" ? "standard" : "express";
  };

  return (
    <>
      <Navbar />
      <>
        <div className=" mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-center mb-12">
            <FaLeaf className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Your Organic Cart
            </h1>
          </div>

          {cartLoading ? (
            <CartLoading />
          ) : showEmptyCart ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-green-100">
                  <div className="p-6 border-b border-green-100 bg-green-50">
                    <div className="flex items-center">
                      <FaShoppingBag className="h-6 w-6 text-green-600 mr-2" />
                      <h2 className="text-2xl font-semibold text-gray-800">
                        Shopping Cart ({cartItems.length})
                      </h2>
                    </div>
                  </div>

                  <ul className="">
                    {cartItems?.map((item) => (
                      <li
                        key={item.id}
                        className="border-y border-green-200 py-2 px-4 hover:bg-green-50 transition-colors duration-200 "
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
                          <div className="flex-shrink-0 bg-white rounded-xl p-1 shadow-md border border-green-100 overflow-hidden">
                            <img
                              src={item.image || placeHolderImage}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.title}
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium ml-1">
                                <FaLeaf className="w-3 h-3 mr-1" />
                                {item.category}
                              </span>
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                              {item?.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-sm text-red-500 flex items-center hover:text-red-700 transition-colors"
                              >
                                <FaTrashAlt className="w-4 h-4 mr-1" />
                                Remove
                              </button>

                              <button
                                onClick={() => buyNowItem(item)}
                                className="text-sm text-yellow-500 flex items-center hover:text-yellow-700 transition-colors"
                              >
                                <FaShoppingCart className="w-4 h-4 mr-1" />
                                Buy Now
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-4 mt-4 sm:mt-0">
                            <div className="flex items-center bg-white border-2 border-green-200 rounded-md overflow-hidden shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                className="px-3 py-2 text-green-600 hover:bg-green-50 transition-colors"
                              >
                                <FaMinus className="w-4 h-4" />
                              </button>
                              <span className=" text-gray-800 font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="px-3 py-2 text-green-600 hover:bg-green-50 transition-colors"
                              >
                                <FaPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center text-center">
                              <p className="text-xl font-bold text-gray-800">
                                ₹
                                {(
                                  item.discount_price_inr * item.quantity
                                )?.toFixed(2)}
                              </p>
                              <p className="text-sm ml-1 text-gray-500">
                                ₹{item.discount_price_inr?.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="p-6 bg-green-50 border-t border-green-100">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate("/organicsproducts")}
                        className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
                      >
                        <FaArrowRight className="w-4 h-4 mr-1 transform rotate-180" />
                        Continue Shopping
                      </button>
                      <div className="text-gray-600">
                        Subtotal:{" "}
                        <span className="font-bold text-gray-800">
                          ₹{calculateSubtotal()?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
                    <div className="flex items-center mb-4">
                      <FaTruck className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-800">
                        Delivery Options
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-green-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                        <input
                          type="radio"
                          name="delivery"
                          className="form-radio text-green-600 h-4 w-4"
                          defaultChecked
                          value={50}
                          onChange={(e) => setShippingChnarge(e.target.value)}
                        />
                        <span className="ml-2">
                          <span className="block text-sm font-medium text-gray-800">
                            Standard Delivery
                          </span>
                          <span className="block text-xs text-gray-500">
                            2-3 business days
                          </span>
                        </span>
                        <span className="ml-auto font-medium text-gray-800">
                          ₹50
                        </span>
                      </label>
                      <label className="flex items-center p-3 border border-green-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                        <input
                          type="radio"
                          name="delivery"
                          className="form-radio text-green-600 h-4 w-4"
                          value={70}
                          onChange={(e) => setShippingChnarge(e.target.value)}
                        />
                        <span className="ml-2">
                          <span className="block text-sm font-medium text-gray-800">
                            Express Delivery
                          </span>
                          <span className="block text-xs text-gray-500">
                            Next business day
                          </span>
                        </span>
                        <span className="ml-auto font-medium text-gray-800">
                          ₹70
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
                    <h2 className="flex items-center font-semibold text-gray-800 mb-2">
                      <FaCreditCard className="h-5 w-5 text-green-600 mr-2" />
                      Customer Benefits
                    </h2>
                    <div className="mt-2 bg-green-50 p-4 rounded-xl border border-green-100">
                      <ul className="text-xs text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <div className="h-4 w-4 rounded-full bg-green-200 flex items-center justify-center mt-0.5 mr-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          Free shipping on orders over only for Standard
                          Delivery ₹500
                        </li>
                        <li className="flex items-start">
                          <div className="h-4 w-4 rounded-full bg-green-200 flex items-center justify-center mt-0.5 mr-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          30-day money-back guarantee
                        </li>
                        <li className="flex items-start">
                          <div className="h-4 w-4 rounded-full bg-green-200 flex items-center justify-center mt-0.5 mr-2">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          100% organic certified products
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-green-100 sticky top-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-green-100">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal (
                        {cartItems
                          .reduce((acc, item) => acc + item.quantity, 0)
                          ?.toFixed(2)}{" "}
                        items)
                      </span>
                      <span className="text-gray-800 font-medium">
                        ₹{calculateSubtotal()?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-800 font-medium">
                        ₹{shippingCharge}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax ( 7% )</span>
                      <span className="text-gray-800 font-medium">
                        ₹{calculateTax()?.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-4 mt-4">
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          placeholder="Promo code"
                          className="flex-grow px-4 py-2 border border-green-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-green-100 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-gray-800">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Including VAT
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                    onClick={() => handleGoToOrder(cartItems, calculateTotal())}
                  >
                    <span>Proceed to Checkout</span>
                    <FaArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center">
                      <FaLeaf className="h-4 w-4 text-green-500 mr-1" />
                      <span>Eco-friendly packaging on all orders</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-green-100">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaShoppingBag className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added any organic goodness to your cart
          yet.
        </p>
        <button
          onClick={() => navigate("/organicsproducts")}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};
