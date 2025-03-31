import { useEffect, useState } from "react";
import Analytics from "./Analytics";
import AdminNav from "./AdminNav";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl, baseUrl2 } from "../../config/confg";
import axios from "axios";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import PropTypes from "prop-types";
import Sidebar from "./Component/Sidebar";
import { getSessionData } from "../utils/utils";
import Loader from "../Pages/LoadingUI/Loader";

export default function AdminAnalytics() {
  const [productsData, setProductsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const [totalData, setTotalData] = useState({
    prodCount: 0,
    usersCount: 0,
    orderCount: 0,
  });

  const [showBarChartProducts, setShowBarChartProducts] = useState(true);
  const [showBarChartUsers, setShowBarChartUsers] = useState(true);
  const [showBarChartOrders, setShowBarChartOrders] = useState(true);

  const [activeTab, setActiveTab] = useState("Products");
  const [loadAnaytics, setLoadAnaytics] = useState(false);

  useEffect(() => {
    const product_url = `${baseUrl2}/products/saler/${getSessionData("_id")}`;
    const users_url = `${baseUrl2}/users`;
    const cod_url = `${baseUrl2}/orders/${getSessionData("_id")}`;

    const fetchAllData = async () => {
      try {
        setLoadAnaytics(true);
        const [productData, usersData, totalOrders] = await Promise.all([
          fetchData(product_url),
          fetchData(users_url),
          fetchData(cod_url),
        ]);
        setLoadAnaytics(false);

        // Processing Product Data
        let formattedProducts = [];
        if (Array.isArray(productData)) {
          const categoryCounts = productData.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {});

          formattedProducts = Object.entries(categoryCounts).map(
            ([category, count]) => ({
              prod_category: category,
              value: count,
            })
          );
        }

        // Processing Users Data
        let formattedUsers = [];
        if (Array.isArray(usersData?.usersList)) {
          const formattedGender = usersData?.usersList.reduce((acc, user) => {
            acc[user.gender] = (acc[user.gender] || 0) + 1;
            return acc;
          }, {});
          formattedUsers = Object.entries(formattedGender).map(
            ([gender, count]) => ({
              prod_category: gender,
              value: count,
            })
          );
        }

        // Processing Order Data
        let formattedOrder = [];
        if (Array.isArray(totalOrders)) {
          const formettedPayMethod = totalOrders.reduce((acc, user) => {
            acc[user.payment_method] = (acc[user.payment_method] || 0) + 1;
            return acc;
          }, {});
          formattedOrder = Object.entries(formettedPayMethod).map(
            ([payment_method, count]) => ({
              prod_category: payment_method,
              value: count,
            })
          );
        }
        // Updating State Efficiently
        setTotalData({
          prodCount: productData.length || 0,
          usersCount: usersData.usersList.length || 0,
          orderCount: totalOrders?.length || 0,
        });

        setProductsData(formattedProducts);
        setUsersData(formattedUsers);
        setOrdersData(formattedOrder);
        console.log(totalOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
        <aside className="w-full md:w-1/4 lg:w-1/5  dark:bg-gray-800">
          {/* <SuperDashBoard show_descrition={false} /> */}
          <Sidebar />
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5 p-6">
          <div className="space-y-6">
            {/* add a tab */}

            <div className="flex border-b">
              {[
                "Products",
                getSessionData("role_id") == 1 ? "Users" : null,
                "Orders",
              ]
                .filter(Boolean) // Removes null values
                .map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
            </div>
            {loadAnaytics ? (
              <div className="flex items-center bg-white justify-center h-[400px] w-full">
                <Loader />
              </div>
            ) : (
              <div className="p-4">
                {activeTab === "Products" && (
                  <div>
                    {/* Products Chart */}
                    <TotalCountsComponent
                      label={"Total Products"}
                      value={totalData?.prodCount}
                    />
                    <section className="rounded-lg p-4 bg-white shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-green-700">
                          Product Categories Distribution
                        </h2>

                        <div className="flex gap-2">
                          {/* Bar Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              showBarChartProducts
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartProducts(true)}
                          >
                            <FaChartBar /> Bar
                          </button>

                          {/* Pie Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              !showBarChartProducts
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartProducts(false)}
                          >
                            <FaChartPie /> Pie
                          </button>
                        </div>
                      </div>
                      <Analytics
                        chart_data={productsData}
                        bar_title="Bar Chart"
                        pie_title="Pie Chart"
                        showBarChart={showBarChartProducts}
                      />
                    </section>
                  </div>
                )}
                {activeTab === "Users" && (
                  <div>
                    {/* Users Chart */}
                    <TotalCountsComponent
                      label={"Total Users"}
                      value={totalData?.usersCount}
                    />
                    <section className="rounded-lg p-4 bg-white shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-green-700">
                          User Signups Over Time
                        </h2>

                        <div className="flex gap-2">
                          {/* Bar Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              showBarChartUsers
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartUsers(true)}
                          >
                            <FaChartBar /> Bar
                          </button>

                          {/* Pie Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              !showBarChartUsers
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartUsers(false)}
                          >
                            <FaChartPie /> Pie
                          </button>
                        </div>
                      </div>
                      <Analytics
                        chart_data={usersData}
                        bar_title="Bar Chart"
                        pie_title="Pie Chart"
                        showBarChart={showBarChartUsers}
                      />
                    </section>
                  </div>
                )}
                {activeTab === "Orders" && (
                  <div>
                    {/* Orders Chart */}
                    <TotalCountsComponent
                      label={"Total Orders"}
                      value={totalData?.orderCount}
                    />
                    <section className="rounded-lg p-4 bg-white shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-green-700">
                          Orders Distribution: COD vs PayPal
                        </h2>
                        <div className="flex gap-2">
                          {/* Bar Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              showBarChartOrders
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartOrders(true)}
                          >
                            <FaChartBar /> Bar
                          </button>

                          {/* Pie Chart Button */}
                          <button
                            className={`px-4 py-2 font-semibold rounded-md flex items-center gap-2 transition ${
                              !showBarChartOrders
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-black border-black"
                            }`}
                            onClick={() => setShowBarChartOrders(false)}
                          >
                            <FaChartPie /> Pie
                          </button>
                        </div>
                      </div>
                      <Analytics
                        chart_data={ordersData}
                        bar_title="Bar Chart"
                        pie_title="Pie Chart"
                        showBarChart={showBarChartOrders}
                      />
                    </section>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export const TotalCountsComponent = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between w-80 p-6 mb-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-medium text-gray-800">{label}</h2>
      <p className="text-4xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

TotalCountsComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Returns the fetched data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null; // Returns null in case of an error
  }
};
