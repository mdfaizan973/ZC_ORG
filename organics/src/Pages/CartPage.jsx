import Navbar from "../Components/Navbar";

import { useState } from "react";
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: "Fruits",
      name: "Organic Fresh Avocado",
      price: 3.99,
      quantity: 2,
      image:
        "https://i.pinimg.com/564x/62/57/c2/6257c298033ed1ee2c66bd652db459dc.jpg",
      description:
        "Crisp and hearty rye crackers, perfect for snacking with your favorite dips and spreads...",
    },
    {
      id: 2,
      category: "Vegetables",
      name: "Organic Kale Bundle",
      price: 2.49,
      quantity: 1,
      image:
        "https://i.pinimg.com/564x/2f/d3/c2/2fd3c25d9286b9257c10119168fef080.jpg",
      description:
        "Fresh organic kale, perfect for healthy smoothies and salads.",
    },
    {
      id: 3,
      category: "Grains",
      name: "Organic Honey Jar",
      price: 8.99,
      quantity: 1,
      image: "https://placehold.co/400x400.png",
      description: "Raw & unfiltered organic honey for natural sweetness.",
    },
    {
      id: 4,
      category: "Grains",
      name: "Organic Grain Jar",
      price: 6.99,
      quantity: 1,
      image: "https://placehold.co/400x400.png",
      description: "Premium organic grains, perfect for a healthy diet.",
    },
    {
      id: 5,
      category: "Grains",
      name: "Organic Whole Grains",
      price: 38.99,
      quantity: 1,
      image: "https://placehold.co/400x400.png",
      description: "A mix of whole organic grains for a balanced diet.",
    },
  ]);
  const [shippingCharge, setShippingChnarge] = useState(5.99);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal() || 0; // Ensure subtotal is a number
    const tax = calculateTax() || 0; // Ensure tax is a number
    const shipping = subtotal < 50 ? shippingCharge : 0; // Ensure shipping is a number

    return Number(subtotal) + Number(tax) + Number(shipping); // Convert to number just in case
  };

  const getUserInfo = (param) => {
    const userData = {
      user_name: "John Doe",
      user_id: "23423sdfsdfs",
      user_email: "john@example.com",
      user_address: "123 Main Street, NY",
      user_phone_no: "+1-234-567-8901",
    };

    return userData[param] || null;
  };

  const buyNowItem = (item) => {
    const price = item.price * item.quantity;
    const shipping = price < 50 ? shippingCharge : 0;
    const tax = calculateTax() || 0;

    const total = Number(price) + Number(tax) + Number(shipping);
    handleGoToOrder([item], total);
  };

  const handleGoToOrder = (cartData, totalPrice) => {
    const prepare_data = {};
    prepare_data["list_of_items"] = cartData;
    prepare_data["delivery_options"] = getDeliveryOption(shippingCharge);
    prepare_data["total_rupees"] = totalPrice;
    prepare_data["user_id"] = getUserInfo("user_id");
    prepare_data["delivery_date"] = getFutureDate(
      getDeliveryOption(shippingCharge) == "standard" ? 4 : 1
    );

    console.log(120, prepare_data);
  };

  const getFutureDate = (daysAhead) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    return futureDate.toISOString();
  };

  const getDeliveryOption = (shipStatus) => {
    return shipStatus == "5.99" ? "standard" : "express";
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

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-green-100">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingBag className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any organic goodness to your cart
                yet.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Continue Shopping
              </button>
            </div>
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
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="border-y border-green-200 py-2 px-4 hover:bg-green-50 transition-colors duration-200 "
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
                          <div className="flex-shrink-0 bg-white rounded-xl p-1 shadow-md border border-green-100 overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.name}
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium ml-1">
                                <FaLeaf className="w-3 h-3 mr-1" />
                                {item.category}
                              </span>
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => removeItem(item.id)}
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
                                  updateQuantity(item.id, item.quantity - 1)
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
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-2 text-green-600 hover:bg-green-50 transition-colors"
                              >
                                <FaPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center text-center">
                              <p className="text-xl font-bold text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm ml-1 text-gray-500">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="p-6 bg-green-50 border-t border-green-100">
                    <div className="flex justify-between items-center">
                      <button className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center">
                        <FaArrowRight className="w-4 h-4 mr-1 transform rotate-180" />
                        Continue Shopping
                      </button>
                      <div className="text-gray-600">
                        Subtotal:{" "}
                        <span className="font-bold text-gray-800">
                          ${calculateSubtotal().toFixed(2)}
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
                          value={5.99}
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
                          $5.99
                        </span>
                      </label>
                      <label className="flex items-center p-3 border border-green-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                        <input
                          type="radio"
                          name="delivery"
                          className="form-radio text-green-600 h-4 w-4"
                          value={12.99}
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
                          $12.99
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
                          Free shipping on orders over $50
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
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span className="text-gray-800 font-medium">
                        ${calculateSubtotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-800 font-medium">
                        ${shippingCharge}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax ( 7% )</span>
                      <span className="text-gray-800 font-medium">
                        ${calculateTax().toFixed(2)}
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
                          ${calculateTotal().toFixed(2)}
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
