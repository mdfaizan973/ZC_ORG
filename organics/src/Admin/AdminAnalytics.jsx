import { useEffect, useState } from "react";
import Analytics from "./Analytics";
import AdminNav from "./AdminNav";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl } from "../../config/confg";
import axios from "axios";

export default function AdminAnalytics() {
  const [productsData, setProductsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

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
          <div className="space-y-8">
            {/* Products Chart */}
            <section className="rounded-lg p-4">
              <h2 className="text-2xl font-bold text-green-700  mb-4">
                Product Categories Distribution
              </h2>
              <Analytics
                chart_data={productsData}
                bar_title="Bar Chart"
                pie_title="Pie Chart"
              />
            </section>

            {/* Users Chart */}
            <section className="rounded-lg p-4">
              <h2 className="text-2xl font-bold text-green-700  mb-4">
                User Signups Over Time
              </h2>
              <Analytics
                chart_data={usersData}
                bar_title="Bar Chart"
                pie_title="Pie Chart"
              />
            </section>

            {/* Orders Chart */}
            <section className="rounded-lg p-4">
              <h2 className="text-2xl font-bold text-green-700  mb-4">
                Orders Distribution: COD vs PayPal
              </h2>
              <Analytics
                chart_data={ordersData}
                bar_title="Bar Chart"
                pie_title="Pie Chart"
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // Returns the fetched data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null; // Returns null in case of an error
  }
};
