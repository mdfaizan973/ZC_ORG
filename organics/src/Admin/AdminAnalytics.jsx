import { useEffect, useState } from "react";
import Analytics from "./Analytics";
import AdminNav from "./AdminNav";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl } from "../../config/confg";
import axios from "axios";
import { FaChartBar, FaChartPie } from "react-icons/fa";
export default function AdminAnalytics() {
  const [productsData, setProductsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const [showBarChartProducts, setShowBarChartProducts] = useState(true);
  const [showBarChartUsers, setShowBarChartUsers] = useState(true);
  const [showBarChartOrders, setShowBarChartOrders] = useState(true);

  useEffect(() => {
    const product_url = `${baseUrl}/orgproducts`;
    const users_url = `${baseUrl}/users`;
    const cod_url = `${baseUrl}/codorders`;
    const pp_url = `${baseUrl}/pporders`;

    const getProductsData = async () => {
      const data = await fetchData(product_url);
      if (data) {
        const categoryCounts = data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryCounts).map(
          ([category, count]) => ({
            prod_category: category,
            value: count,
          })
        );

        setProductsData(formattedData);
      }
    };

    const getUsersData = async () => {
      const data = await fetchData(users_url);
      if (data) {
        const users = Array.isArray(data) ? data : [data];
        const dateCountMap = users.reduce((acc, user) => {
          const date = user.date.split(",")[0]; // Extract only the date part
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const formattedUsersData = Object.keys(dateCountMap).map((date) => ({
          prod_category: date,
          value: dateCountMap[date],
        }));

        setUsersData(formattedUsersData);
      }
    };

    const getOrdersData = async () => {
      const cod_order = await fetchData(cod_url);
      const pp_order = await fetchData(pp_url);
      setOrdersData([
        {
          prod_category: "C O D",
          value: cod_order.length,
        },
        {
          prod_category: "Pay Pal",
          value: pp_order.length,
        },
      ]);
    };

    getProductsData();
    getUsersData();
    getOrdersData();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
        <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
          <SuperDashBoard show_descrition={false} />
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5 p-6">
          <div className="space-y-6">
            {/* add a tab */}

            {/* Products Chart */}
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

            {/* Users Chart */}
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

            {/* Orders Chart */}
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
        </main>
      </div>
    </div>
  );
}

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Returns the fetched data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null; // Returns null in case of an error
  }
};
