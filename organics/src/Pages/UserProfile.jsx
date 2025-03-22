import Navbar from "../Components/Navbar";

import { useEffect, useRef, useState } from "react";
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
  FiX,
} from "react-icons/fi";
import { FaShoppingCart, FaBox, FaTrafficLight } from "react-icons/fa";
import {
  MdOutlineVerified,
  MdLocalShipping,
  MdOutlinePendingActions,
  MdCancel,
} from "react-icons/md";
import { BiPackage } from "react-icons/bi";
import {
  deleteData,
  fetchData,
  fixedNumber,
  getSessionData,
  postData,
} from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl2, imageUrl } from "../../config/confg";
import Loader from "./LoadingUI/Loader";
import { useNavigate } from "react-router-dom";
import { placeHolderImage } from "../utils/uiUtils";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const [salerInfo, setSalerInfo] = useState({
    saler_name: "",
    saler_email: "",
    saler_business_name: "",
    sell_description: "",
  });
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
    {
      id: 4,
      image: "https://placehold.co/400x400.png",
      title: "Organic Raw Honey - 16oz Jar",
      price: "$8.50",
      originalPrice: "$10.99",
      category: "Sweeteners",
      status: "Cancel",
      date: "July 10, 2023",
      rating: null,
    },
    {
      id: 5,
      image: "https://placehold.co/400x400.png",
      title: "Organic Raw Honey - 16oz Jar",
      price: "$8.50",
      originalPrice: "$10.99",
      category: "Sweeteners",
      status: "Delivered",
      date: "July 10, 2023",
      rating: null,
    },
  ];

  const sellingPoints = [
    "Reach thousands of health-conscious customers",
    "Zero listing fees for organic products",
    "Dedicated support for organic sellers",
    "Promote sustainable and eco-friendly products",
    "Join our growing community of organic producers",
  ];

  const handleLogOut = () => {
    sessionStorage.removeItem("OranicSessionStorge");
    // setIslogin(false);
    toast.error("Logout Successful", {
      position: toast.POSITION.TOP_CENTER,
    });
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await postData(`${baseUrl2}/saler`, salerInfo);

    setSalerInfo({
      saler_name: "",
      saler_email: "",
      saler_business_name: "",
      sell_description: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className=" mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Hey! Organic Store Customer
            </h1>
            <p className="text-gray-500">
              Welcome back to your organic journey
            </p>
          </div>
          <button
            onClick={handleLogOut}
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 hover:shadow-md"
          >
            <FiLogOut />
            Log Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 bg-white p-2 rounded-xl shadow-sm">
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
            <div className="p-6 mb-1">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 bg-green-50 rounded-xl p-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={
                          getSessionData("profile_image") || placeHolderImage
                        }
                        alt="Profile"
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                      <FiEdit2 size={14} />
                    </button> */}
                  </div>
                  <h2 className="text-xl font-semibold text-green-800">
                    {getSessionData("name")}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <FiCalendar size={14} />
                    Member since{" "}
                    {new Date(getSessionData("createdAt")).toLocaleString()}
                  </p>

                  <div className="mt-6 w-full">
                    <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                      <FiMail className="text-green-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-sm">
                          {getSessionData("email")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                      <FiMapPin className="text-green-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium text-sm">
                          {getSessionData("address")}
                        </p>
                      </div>
                    </div>

                    {getSessionData("business") && (
                      <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-lg">
                        <FiMapPin className="text-green-600" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Business Name</p>
                          <p className="font-medium text-sm">
                            {getSessionData("business")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <div className="flex justify-between mb-6">
                    <h3 className="text-xl font-semibold text-green-800">
                      Personal Information
                    </h3>
                    {/* <button className="flex items-center gap-1 text-green-600 hover:text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:shadow-md transition-all">
                      <FiEdit2 size={16} />
                      Edit Profile
                    </button> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-800">
                        {getSessionData("name")}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">
                        Email Address
                      </p>
                      <p className="font-medium text-gray-800">
                        {" "}
                        {getSessionData("email")}
                      </p>
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
                        {getSessionData("pass")?.slice(0, 7)}****
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Gender</p>
                      <p className="font-medium text-gray-800">
                        {getSessionData("gender")}
                      </p>
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
                        {getSessionData("address")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              // orderList={orderList}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {activeTab === "wishlist" && (
            <WishlistTab
              // wishlist={wishlist}
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
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="saler_name"
                        name="saler_name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                        value={salerInfo.saler_name}
                        onChange={handleInputChange}
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
                        id="saler_email"
                        name="saler_email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email address"
                        required
                        value={salerInfo.saler_email}
                        onChange={handleInputChange}
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
                        id="saler_business_name"
                        name="saler_business_name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your business name"
                        required
                        value={salerInfo.saler_business_name}
                        onChange={handleInputChange}
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
                        name="sell_description"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Briefly describe your products"
                        value={salerInfo.sell_description}
                        onChange={handleInputChange}
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
  const [orderList, setOrderList] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load_allorders();
  }, []);

  const load_allorders = async () => {
    setLoadingOrders(true);
    const ordersData = await fetchData(
      `${baseUrl2}/orders/${getSessionData("_id")}`
    );
    setLoadingOrders(false);
    const newOrderData = ordersData
      .map((ele) =>
        ele.list_of_items.map((item) => ({
          ...item,
          prod_status: ele.order_status,
          prod_date: ele.delivery_date,
        }))
      )
      .flat(); // with status pending with all the object
    setOrderList(newOrderData);
  };

  const getOrderStatus = (status_type) => {
    const statusType = orderList.filter(
      (ele) => ele?.prod_status === status_type
    );

    if (statusType) {
      return statusType.length || 0;
    }
  };

  const goToDetailsPage = (id) => {
    navigate(`/productdiscription/${id}`);
  };
  const getTotalPrice = () => {
    const total = orderList.reduce((acc, item) => item.prod_price + acc, 0);
    return `₹ ${fixedNumber(total)}` || 0;
  };

  // const sortingData = (val) => {
  //   const dataToSort = [...orderList];
  //   if (val === "hightolow") {
  //     // hightolow
  //     const dec = dataToSort.sort((a, b) => a.prod_price - b.prod_price);
  //     setOrderList(dec);
  //   } else if (val === "lowtohigh") {
  //     // lowtohigh
  //     const dec = dataToSort.sort((a, b) => b.prod_price - a.prod_price);
  //     setOrderList(dec);
  //   } else {
  //     // as it is
  //     setOrderList(dataToSort);
  //   }
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-green-800">
          Your Orders{" "}
          <span className="text-lg text-gray-400">
            (Reflects item details at the time of purchase)
          </span>{" "}
        </h3>
        <div className="flex items-center gap-4">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <OrderStat
            label="Total Orders"
            value={orderList?.length || 0}
            icon={<FaBox className="text-green-600" size={24} />}
          />
          <OrderStat
            label="Completed"
            value={getOrderStatus("Delivered")}
            icon={<MdOutlineVerified className="text-green-600" size={24} />}
          />
          <OrderStat
            label="In Progress"
            value={getOrderStatus("Processing")}
            icon={<MdLocalShipping className="text-blue-600" size={24} />}
          />

          <OrderStat
            label="Total Spent"
            value={getTotalPrice()}
            icon={<div className="text-green-600 text-xl font-bold">₹</div>}
          />
        </div>
      </div>

      {loadingOrders ? (
        <div className="flex items-center justify-center w-full h-[400px]">
          <Loader />
        </div>
      ) : orderList.length > 0 ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-6"
          }`}
        >
          {orderList?.map((order) =>
            viewMode === "grid" ? (
              <OrderCard
                key={order.id}
                order={order}
                goToDetailsPage={goToDetailsPage}
              />
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

function WishlistTab({ viewMode, setViewMode }) {
  const [wishListData, setWishListData] = useState([]);
  const [loadingWishList, setLoadingWishList] = useState(true);
  const [emptyWishList, setEmptyWishList] = useState(false);
  const wishlistDataRef = useRef([]);

  const navigate = useNavigate();
  useEffect(() => {
    loadWistListData();
  }, []);

  const loadWistListData = async () => {
    setLoadingWishList(true);
    const _user_id = getSessionData("_id");
    const wishlistData = await fetchData(
      `${baseUrl2}/product-wishlist/${_user_id}`
    );
    setLoadingWishList(false);

    if (wishlistData.length > 0) {
      setWishListData(wishlistData);
      setLoadingWishList(false);
      wishlistDataRef.current = wishlistData;
    } else {
      setEmptyWishList(true);
    }
  };

  const goToDetailsPage = (id) => {
    navigate(`/productdiscription/${id}`);
  };

  const removeItemFromWishList = async (id) => {
    await deleteData(`${baseUrl2}/product-wishlist/${id}`);
    loadWistListData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-green-800">
          Your Wishlist{" "}
          <span className="text-lg text-gray-400">
            (Reflects item details at the time of adding)
          </span>{" "}
        </h3>
        <div className="flex items-center gap-4">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      {loadingWishList ? (
        <div className="flex items-center justify-center w-full h-[400px]">
          <Loader />
        </div>
      ) : emptyWishList ? (
        <EmptyState
          icon={<FiHeart size={48} className="text-gray-400" />}
          title="Your Wishlist is Empty"
          description="Save items you like to your wishlist and come back to them anytime."
          actionLabel="Explore Products"
        />
      ) : (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-6"
          }`}
        >
          {wishListData?.map((item) =>
            viewMode === "grid" ? (
              <WishlistCard
                key={item.id}
                item={item}
                removeItemFromWishList={removeItemFromWishList}
                goToDetailsPage={goToDetailsPage}
              />
            ) : (
              <WishlistListItem
                key={item.id}
                item={item}
                removeItemFromWishList={removeItemFromWishList}
                goToDetailsPage={goToDetailsPage}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

import { FiDownload, FiPackage, FiTruck, FiHome } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

export const OrderStatusModal = ({ order, closeModel }) => {
  // Helper function to determine if a step is active or completed
  const getStepStatus = (step) => {
    const statusOrder = ["Processing", "Shipped", "Delivered"];
    const currentIndex = statusOrder.indexOf(order.prod_status);
    const stepIndex = statusOrder.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  // Get appropriate icon for each step
  const getStepIcon = (step) => {
    if (step === "Processing") return <FiPackage className="h-5 w-5" />;
    if (step === "Shipped") return <FiTruck className="h-5 w-5" />;
    if (step === "Delivered") return <FiHome className="h-5 w-5" />;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          <button
            className="text-gray-400 hover:text-gray-500 transition-colors"
            onClick={closeModel}
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Order details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-2xl font-medium text-gray-800 mb-1">
                  {order?.prod_name || "Product Name"}
                </h4>
                <p className="text-sm text-gray-500">
                  Order ID {order?.prod_id || "*****"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Order Amount</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{order?.prod_price?.toLocaleString() || "0"}
                </p>
              </div>
            </div>

            {order?.estimated_delivery && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Estimated Delivery:</span>{" "}
                {order.estimated_delivery}
              </p>
            )}

            {order.prod_status === "Delivered" && (
              <div className="flex justify-end mt-3">
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm">
                  <FiDownload className="mr-1" /> Download Invoice
                </button>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h4 className="text-base font-medium text-gray-800 mb-6">
              Order Timeline
            </h4>

            <div className="relative">
              {/* Timeline track */}
              <div className="absolute left-0 ml-[15px] top-0 h-full w-[2px] bg-gray-200"></div>

              {/* Processing Step */}
              <div className="relative flex items-start mb-10">
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-300
                  ${
                    getStepStatus("Processing") === "active"
                      ? "bg-blue-500 text-white ring-4 ring-blue-100"
                      : getStepStatus("Processing") === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {getStepStatus("Processing") === "completed" ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    getStepIcon("Processing")
                  )}
                </div>
                <div className="ml-6">
                  <h5
                    className={`font-medium text-base ${
                      getStepStatus("Processing") === "active"
                        ? "text-blue-600"
                        : getStepStatus("Processing") === "completed"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Order Processing
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    Your order has been received and is being processed
                  </p>
                  {order?.processing_date && (
                    <p className="text-xs text-gray-400 mt-2">
                      {order.processing_date}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipped Step */}
              <div className="relative flex items-start mb-10">
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-300
                  ${
                    getStepStatus("Shipped") === "active"
                      ? "bg-blue-500 text-white ring-4 ring-blue-100"
                      : getStepStatus("Shipped") === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {getStepStatus("Shipped") === "completed" ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    getStepIcon("Shipped")
                  )}
                </div>
                <div className="ml-6">
                  <h5
                    className={`font-medium text-base ${
                      getStepStatus("Shipped") === "active"
                        ? "text-blue-600"
                        : getStepStatus("Shipped") === "completed"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Shipped
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    Your order has been shipped and is on the way
                  </p>
                  {order?.shipping_date && (
                    <p className="text-xs text-gray-400 mt-2">
                      {order.shipping_date}
                    </p>
                  )}
                  {order?.tracking_number &&
                    getStepStatus("Shipped") !== "pending" && (
                      <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm">
                        <p className="font-medium text-gray-700">
                          Tracking #: {order.tracking_number}
                        </p>
                      </div>
                    )}
                </div>
              </div>

              {/* Delivered Step */}
              <div className="relative flex items-start">
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-300
                  ${
                    getStepStatus("Delivered") === "active"
                      ? "bg-blue-500 text-white ring-4 ring-blue-100"
                      : getStepStatus("Delivered") === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {getStepStatus("Delivered") === "completed" ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    getStepIcon("Delivered")
                  )}
                </div>
                <div className="ml-6">
                  <h5
                    className={`font-medium text-base ${
                      getStepStatus("Delivered") === "active"
                        ? "text-blue-600"
                        : getStepStatus("Delivered") === "completed"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Delivered
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    Your order has been delivered successfully
                  </p>
                  {order?.delivery_date && (
                    <p className="text-xs text-gray-400 mt-2">
                      {order.delivery_date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional order information */}
          {/* {order?.shipping_address && ( */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-800 mb-3">
              Shipping Address
            </h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {/* {order.shipping_address} */}India
            </p>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

function OrderCard({ order, goToDetailsPage }) {
  const [orderStatus, setOrderStatus] = useState(false);

  const showOrderStatus = () => {
    setOrderStatus(true);
  };

  const closeModel = () => {
    setOrderStatus(false);
  };
  return (
    <>
      <div
        key={order?.prod_id}
        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div
          className="relative"
          onClick={() => goToDetailsPage(order?.prod_id)}
        >
          <div className="flex justify-center items-center bg-gray-50 p-2">
            <img
              src={`${imageUrl}${order?.prod_image}` || placeHolderImage}
              alt={order?.prod_name}
              width={100}
              height={100}
              className="object-contain h-30 w-30 rounded-full"
            />
          </div>

          <div className="absolute top-2 right-2">
            <OrderStatusBadge status={order?.prod_status} />
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1 flex items-center justify-between">
            <p>{order?.prod_category}</p> <p>(Qty {order?.prod_qty})</p>
          </div>
          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {order?.prod_name?.substring(0, 20)}..
          </h4>

          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-green-800">
              ₹{fixedNumber(order?.prod_price)}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <FiCalendar size={14} className="text-gray-400" />
              <span className="text-gray-600">
                {new Date(order?.prod_date).toDateString()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => goToDetailsPage(order?.prod_id)}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-lg transition-colors"
            >
              <FaShoppingCart size={12} />
              Shop
            </button>
            <button
              onClick={showOrderStatus}
              className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-2 rounded-lg transition-colors"
            >
              <FaTrafficLight size={12} />
              Status
            </button>
          </div>
        </div>
      </div>
      {orderStatus && (
        <OrderStatusModal order={order} closeModel={closeModel} />
      )}
    </>
  );
}

function OrderListItem({ order }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow max-w-3xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Image */}
        <img
          src={order.image || placeHolderImage}
          alt={order.title}
          className="w-20 h-20 rounded-lg object-cover"
        />

        {/* Order Details */}
        <div className="flex-grow text-center sm:text-left">
          <h4 className="font-semibold text-lg text-gray-800">{order.title}</h4>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
            <span>•</span>
            <span>{order.category}</span>
            <OrderStatusBadge status={order.status} />
          </div>
          {/* Price & Status */}
          <div className="text-left">
            <div className="font-bold text-green-700 text-lg">
              {order.price}
            </div>
          </div>
        </div>
        <div>
          <div className="text-right">{order.date}</div>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
            {order.status !== "Cancel" && order.status !== "Delivered" && (
              <button className="flex items-center justify-center w-full sm:w-auto gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-lg transition">
                <MdCancel size={18} />
                Cancel Order
              </button>
            )}

            <button className="flex items-center justify-center w-full sm:w-auto gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-2 rounded-lg transition">
              <MdOutlinePendingActions size={18} />
              Check Status
            </button>
            <button className="flex items-center justify-center w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-lg transition">
              <FaShoppingCart size={16} />
              Shop Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistCard({ item, removeItemFromWishList, goToDetailsPage }) {
  return (
    <>
      <div
        key={item._id}
        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
      >
        {item.product_discount_percentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.product_discount_percentage}% OFF
          </div>
        )}

        <div
          className="flex justify-center items-center bg-gray-50 p-2"
          onClick={() => goToDetailsPage(item.product_id)}
        >
          <img
            src={`${imageUrl}${item.product_img}` || placeHolderImage}
            alt={item.product_title}
            width={100}
            height={100}
            className="object-contain h-30 w-30 rounded-full cursor-pointer"
          />
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{item.product_category}</p>
          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {item.product_title?.substring(0, 20)}..
          </h4>

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-green-800">
                ₹{fixedNumber(item.product_discount_price_inr)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <FiCalendar size={14} className="text-gray-400" />
              <span className="text-gray-600">
                {new Date(item.wishlist_date).toLocaleString().split(",")[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="text-red-600 hover:fill-red-800 transition-colors duration-200"
              onClick={() => removeItemFromWishList(item._id)}
            >
              <FiHeart className="fill-red-600 rounded-full" size={20} />
            </button>

            <button
              onClick={() => goToDetailsPage(item.product_id)}
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
        src={item.product_img || placeHolderImage}
        alt={item.product_title}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-grow">
        <h4 className="font-semibold mb-1">{item.product_title}</h4>
        <div className="text-sm text-gray-500">{item.product_category}</div>
        <div className="mt-1">
          <span className="text-green-700 font-bold">
            {item.product_discount_percentage}%
          </span>
          <span className="text-sm text-gray-500 ml-2">
            ₹{item.product_discount_price_inr}
          </span>
        </div>
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
      {/* <button
        onClick={() => setViewMode("list")}
        className={`p-1 rounded ${
          viewMode === "list" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        <FiList size={20} />
      </button> */}
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
  } else if (status === "Cancel") {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
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
  const navigate = useNavigate();
  return (
    <div className="text-center py-12 bg-gray-50 rounded-xl">
      <div className="mx-auto text-gray-400 mb-4">{icon}</div>
      <h4 className="text-xl font-medium text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      <button
        onClick={() => navigate("/organicsproducts")}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
      >
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
