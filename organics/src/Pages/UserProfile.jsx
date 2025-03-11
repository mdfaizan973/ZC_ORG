import Navbar from "../Components/Navbar";

import { useState } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiDollarSign,
  FiEdit2,
  FiLogOut,
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMail,
  FiMapPin,
  FiLock,
} from "react-icons/fi";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import { MdOutlineVerified, MdLocalShipping } from "react-icons/md";
import { BiPackage } from "react-icons/bi";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("orders");
  const [viewMode, setViewMode] = useState("grid");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********",
    address: "123 Green Street, Organic City, OC 12345",
    gender: "Male",
    profileImage: "https://placehold.co/400x400.png",
    memberSince: "January 2022",
  };

  const orders = [
    {
      id: 1,
      image: "https://placehold.co/400x400.png",
      title: "Organic Apples (Pack of 6)",
      price: "$12.99",
      originalPrice: "$15.99",
      category: "Fruits",
      status: "Delivered",
      date: "June 15, 2023",
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://placehold.co/400x400.png",
      title: "Fresh Spinach - 1lb Bundle",
      price: "$4.99",
      originalPrice: "$6.99",
      category: "Vegetables",
      status: "Shipped",
      date: "July 2, 2023",
      rating: 5,
    },
    {
      id: 3,
      image: "https://placehold.co/400x400.png",
      title: "Organic Raw Honey - 16oz Jar",
      price: "$8.50",
      originalPrice: "$10.99",
      category: "Sweeteners",
      status: "Processing",
      date: "July 10, 2023",
      rating: null,
    },
  ];

  const wishlist = [
    {
      id: 1,
      image: "https://placehold.co/400x400.png",
      title: "Organic Blueberries - Premium Pack",
      price: "$6.99",
      originalPrice: "$8.99",
      category: "Fruits",
      inStock: true,
      discount: "22%",
    },
    {
      id: 2,
      image: "https://placehold.co/400x400.png",
      title: "Almond Milk - Unsweetened",
      price: "$3.99",
      originalPrice: "$4.99",
      category: "Dairy Alternatives",
      inStock: true,
      discount: "20%",
    },
    {
      id: 3,
      image: "https://placehold.co/400x400.png",
      title: "Organic Quinoa - 2lb Bag",
      price: "$7.49",
      originalPrice: "$9.99",
      category: "Grains",
      inStock: false,
      discount: "25%",
    },
  ];

  const sellingPoints = [
    "Reach thousands of health-conscious customers",
    "Zero listing fees for organic products",
    "Dedicated support for organic sellers",
    "Promote sustainable and eco-friendly products",
    "Join our growing community of organic producers",
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Hey! Organic Store Customer
            </h1>
            <p className="text-gray-500">
              Welcome back to your organic journey
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 hover:shadow-md">
            <FiLogOut />
            Log Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          <TabButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon={<FiUser />}
            label="Profile"
          />
          <TabButton
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            icon={<FiShoppingBag />}
            label="Orders"
          />
          <TabButton
            active={activeTab === "wishlist"}
            onClick={() => setActiveTab("wishlist")}
            icon={<FiHeart />}
            label="Wishlist"
          />
          <TabButton
            active={activeTab === "sell"}
            onClick={() => setActiveTab("sell")}
            icon={<FiDollarSign />}
            label="Sell in the Website"
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {activeTab === "profile" && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 bg-green-50 rounded-xl p-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                      <FiEdit2 size={14} />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-green-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <FiCalendar size={14} />
                    Member since {user.memberSince}
                  </p>

                  <div className="mt-6 w-full">
                    <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                      <FiMail className="text-green-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-sm">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                      <FiMapPin className="text-green-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium text-sm">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <div className="flex justify-between mb-6">
                    <h3 className="text-xl font-semibold text-green-800">
                      Personal Information
                    </h3>
                    <button className="flex items-center gap-1 text-green-600 hover:text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:shadow-md transition-all">
                      <FiEdit2 size={16} />
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">
                        Email Address
                      </p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500 mb-1">Password</p>
                        <button className="text-xs text-green-600 hover:underline">
                          Change
                        </button>
                      </div>
                      <p className="font-medium text-gray-800 flex items-center gap-2">
                        <FiLock size={14} />
                        {user.password}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Gender</p>
                      <p className="font-medium text-gray-800">{user.gender}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500 mb-1">
                          Shipping Address
                        </p>
                        <button className="text-xs text-green-600 hover:underline">
                          Add New
                        </button>
                      </div>
                      <p className="font-medium text-gray-800">
                        {user.address}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-800">12</p>
                      <p className="text-sm text-gray-600">Orders</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-800">3</p>
                      <p className="text-sm text-gray-600">Wishlist</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-800">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-800">$249</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {activeTab === "wishlist" && (
            <WishlistTab
              wishlist={wishlist}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {activeTab === "sell" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-6">
                Become a Seller
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-medium text-green-800 mb-4">
                    Apply to Sell
                  </h4>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email address"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Must match your login email to access selling features
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="business"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="business"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your business name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="products"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What products do you want to sell?
                      </label>
                      <textarea
                        id="products"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Briefly describe your products"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Apply to Become a Seller
                    </button>
                  </form>
                </div>

                <div>
                  <div className="bg-green-50 p-6 rounded-xl mb-6">
                    <h4 className="text-lg font-medium text-green-800 mb-4 flex items-center gap-2">
                      <MdOutlineVerified size={20} className="text-green-600" />
                      Why Sell on ORGANIC Store
                    </h4>
                    <ul className="space-y-4">
                      {sellingPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-600 bg-green-100 p-1 rounded-full mt-0.5">
                            <MdOutlineVerified size={16} />
                          </span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white">
                    <h4 className="text-lg font-medium mb-2">
                      Ready to grow your business?
                    </h4>
                    <p className="mb-4 text-green-100">
                      Join thousands of successful sellers on our platform.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-2xl font-bold">2M+</p>
                        <p className="text-green-100">Active Buyers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">10K+</p>
                        <p className="text-green-100">Sellers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">$5M+</p>
                        <p className="text-green-100">Monthly Sales</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function OrdersTab({ orders, viewMode, setViewMode }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-green-800">Your Orders</h3>
        <div className="flex items-center gap-4">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors">
            <FiFilter size={18} />
            Filter
          </button>
          <select className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Sort by: Recent</option>
            <option>Sort by: Price High to Low</option>
            <option>Sort by: Price Low to High</option>
          </select>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <OrderStat
            label="Total Orders"
            value="23"
            icon={<FaBox className="text-green-600" size={24} />}
          />
          <OrderStat
            label="Completed"
            value="19"
            icon={<MdOutlineVerified className="text-green-600" size={24} />}
          />
          <OrderStat
            label="In Progress"
            value="4"
            icon={<MdLocalShipping className="text-blue-600" size={24} />}
          />
          <OrderStat
            label="Total Spent"
            value="$1,234.56"
            icon={<FiDollarSign className="text-green-600" size={24} />}
          />
        </div>
      </div>

      {orders.length > 0 ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-6"
          }`}
        >
          {orders.map((order) =>
            viewMode === "grid" ? (
              <OrderCard key={order.id} order={order} />
            ) : (
              <OrderListItem key={order.id} order={order} />
            )
          )}
        </div>
      ) : (
        <EmptyState
          icon={<FaBox size={48} className="text-gray-400" />}
          title="No Orders Yet"
          description="Looks like you haven't placed any orders. Start shopping to fill this space!"
          actionLabel="Browse Products"
        />
      )}
    </div>
  );
}

function WishlistTab({ wishlist, viewMode, setViewMode }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-green-800">Your Wishlist</h3>
        <div className="flex items-center gap-4">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          <div className="relative">
            <input
              type="text"
              placeholder="Search wishlist"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-6"
          }`}
        >
          {wishlist.map((item) =>
            viewMode === "grid" ? (
              <WishlistCard key={item.id} item={item} />
            ) : (
              <WishlistListItem key={item.id} item={item} />
            )
          )}
        </div>
      ) : (
        <EmptyState
          icon={<FiHeart size={48} className="text-gray-400" />}
          title="Your Wishlist is Empty"
          description="Save items you like to your wishlist and come back to them anytime."
          actionLabel="Explore Products"
        />
      )}
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <>
      <div
        key={order.id}
        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="relative">
          <div className="flex justify-center items-center bg-gray-50 p-2">
            <img
              src={order.image || "/placeholder.svg"}
              alt={order.title}
              width={100}
              height={100}
              className="object-contain h-30 w-30 rounded-full"
            />
          </div>

          <div className="absolute top-2 right-2">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1 flex items-center justify-between">
            <p>{order.category}</p> <p>(Pack of 6)</p>
          </div>
          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {order.title?.substring(0, 20)}..
          </h4>

          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-green-800">{order.price}</p>
            <div className="flex items-center gap-1 text-sm">
              <FiCalendar size={14} className="text-gray-400" />
              <span className="text-gray-600">{order.date}</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-lg transition-colors">
            <FaShoppingCart size={12} />
            Shop Again
          </button>
        </div>
      </div>
    </>
  );
}

function OrderListItem({ order }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <img
        src={order.image || "/placeholder.svg"}
        alt={order.title}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-grow">
        <h4 className="font-semibold mb-1">{order.title}</h4>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{order.date}</span>
          <span>•</span>
          <span>{order.category}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-700">{order.price}</div>
        <OrderStatusBadge status={order.status} />
      </div>
      <button className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full transition-colors">
        <FaShoppingCart size={14} />
        Buy Again
      </button>
    </div>
  );
}

function WishlistCard({ item }) {
  return (
    <>
      <div
        key={item.id}
        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
      >
        {item.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.discount} OFF
          </div>
        )}

        <div className="flex justify-center items-center bg-gray-50 p-2">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={100}
            height={100}
            className="object-contain h-30 w-30 rounded-full"
          />
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{item.category}</p>
          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {item.title?.substring(0, 20)}..
          </h4>

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-green-800">{item.price}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <FiCalendar size={14} className="text-gray-400" />
              <span className="text-gray-600">{item.date}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button className="text-green-600 hover:text-green-800">
              <FiHeart size={18} />
            </button>

            <button
              className={`w-lg flex items-center justify-center gap-2 py-1 px-2 text-sm rounded-lg transition-colors bg-green-600 hover:bg-green-700 text-white`}
            >
              <FaShoppingCart size={12} />
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function WishlistListItem({ item }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-grow">
        <h4 className="font-semibold mb-1">{item.title}</h4>
        <div className="text-sm text-gray-500">{item.category}</div>
        <div className="mt-1">
          <span className="text-green-700 font-bold">{item.price}</span>
          <span className="text-sm text-gray-500 line-through ml-2">
            {item.originalPrice}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {item.inStock ? (
          <span className="text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-red-500 font-medium">Out of Stock</span>
        )}
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
            item.inStock
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!item.inStock}
        >
          <FaShoppingCart size={14} />
          {item.inStock ? "Add to Cart" : "Notify Me"}
        </button>
      </div>
    </div>
  );
}

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-1 rounded ${
          viewMode === "grid" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        <FiGrid size={20} />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-1 rounded ${
          viewMode === "list" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        <FiList size={20} />
      </button>
    </div>
  );
}

function OrderStat({ label, value, icon }) {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center">
      {icon}
      <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function OrderStatusBadge({ status, className = "" }) {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-600";
  let icon = <BiPackage size={14} />;

  if (status === "Delivered") {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
    icon = <MdOutlineVerified size={14} />;
  } else if (status === "Shipped") {
    bgColor = "bg-blue-100";
    textColor = "text-blue-700";
    icon = <MdLocalShipping size={14} />;
  } else if (status === "Processing") {
    bgColor = "bg-amber-100";
    textColor = "text-amber-700";
    icon = <BiPackage size={14} />;
  }

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-full ${bgColor} ${textColor} text-xs font-medium ${className}`}
    >
      {icon}
      {status}
    </div>
  );
}

function EmptyState({ icon, title, description, actionLabel }) {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-xl">
      <div className="mx-auto text-gray-400 mb-4">{icon}</div>
      <h4 className="text-xl font-medium text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors">
        {actionLabel}
      </button>
    </div>
  );
}

// Helper Components
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
        active
          ? "bg-green-600 text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
