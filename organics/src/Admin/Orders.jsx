import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import TableIndid from "./Loding/TableIndid";
import CodOrders from "./CodOrders";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl, baseUrl2 } from "../../config/confg";
import { fetchData } from "./AdminAnalytics";
import Sidebar from "./Component/Sidebar";
import { getSessionData } from "../utils/utils";
import { FiRefreshCw } from "react-icons/fi";

import Loader from "../Pages/LoadingUI/Loader";
export default function Orders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [ppOrders, setPpOrdersData] = useState([]);
  const admingetdata = (page) => {
    setLoad(true);
    axios
      .get(`${baseUrl}/pporders?_limit=10&_page=${page}`)
      .then((res) => {
        // console.log(res.data);
        setLoad(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    admingetdata(page);
  }, [page]);

  const handlepre = () => {
    setPage(page - 1);
  };
  const handlenext = () => {
    setPage(page + 1);
  };

  const users_url = `${baseUrl}/pporders`;

  useEffect(() => {
    const load_Data = async () => {
      try {
        const cod_Data = await fetchData(users_url);
        setPpOrdersData(cod_Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    load_Data();
  }, []);

  //   Delete
  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/pporders/${id}`)
      .then(function (res) {
        console.log(res);
        toast.success(`Deleted order with ID ${id} successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setData(data.filter((item) => item.id !== id));
      })
      .catch(function (error) {
        console.error("Error deleting:", error);
      });
  };

  // Order Data
  const [orderDisplayData, setOrderDisplayData] = useState([]);
  const [orderProdutsList, setOrderProdutsList] = useState([]);
  useEffect(() => {
    load_order_data();
  }, []);
  const load_order_data = async () => {
    const data = await fetchData(
      `${baseUrl2}/orders//${getSessionData("_id")}`
    );
    setOrderDisplayData(data);

    const listOrderProd = data
      .map((ele) =>
        ele.list_of_items
          .filter((item) => item.saler_id === getSessionData("_id"))
          .map((item) => ({
            ...item,
            prod_status: ele.order_status,
            prod_date: ele.delivery_date,
            order_id: ele._id,
            payment_method: ele.payment_method,
            payment_status: ele.payment_status,
          }))
      )
      .flat();

    setOrderProdutsList(listOrderProd);
  };
  console.log(orderDisplayData);
  return (
    <div>
      <ToastContainer />
      <AdminNav />
      <hr />

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900  items-start">
        <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
          <Sidebar />
        </aside>

        {load ? (
          <div className="flex items-center justify-center h-[400px] w-full">
            <Loader />
          </div>
        ) : (
          <main className="w-4/5  rounded ">
            <header className="bg-white border-b border-gray-200 mt-2 mr-2 mb-2">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 p-2 rounded-lg">
                      {/* <FaBug className="text-white text-xl" /> */}
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Orders</h1>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                      Total: {orderDisplayData.length}
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                      <FiRefreshCw className="mr-2" /> Refresh
                    </button>
                  </div>
                </div>
              </div>
            </header>{" "}
            <section className="flex flex-col w-full items-center justify-center">
              <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse rounded-lg">
                    <thead>
                      <tr className="text-sm text-left bg-green-500 text-white">
                        <th className="px-6 py-3 font-medium">Order Id</th>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Category</th>
                        <th className="px-6 py-3 font-medium">
                          Payment Method <br /> Payment Status
                        </th>
                        <th className="px-6 py-3 font-medium">Order Status</th>
                        <th className="px-6 py-3 font-medium text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderProdutsList.map((ele, i) => (
                        <tr
                          key={i}
                          className="text-sm border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {ele.order_id.substring(0, 5)}....
                            </div>
                          </td>{" "}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {ele.prod_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {ele.prod_category?.toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-start">
                              <div className="ml-2 flex items-center">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1 mr-1 max-w-xs">
                                  {ele.payment_method.toUpperCase()}
                                </div>
                                <div
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1
    ${
      ele.payment_status?.toLowerCase() === "paid"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-500"
    }`}
                                >
                                  {ele.payment_status || "UnPaid"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${
        ele.prod_status?.toLowerCase() === "delivered"
          ? "bg-green-100 text-green-600"
          : ele.prod_status?.toLowerCase() === "shipped"
          ? "bg-blue-100 text-blue-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
                            >
                              {ele.prod_status || "Processing"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              // onClick={() => handleDelete(ele.id)}
                              className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-5 h-5"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end pt-4 mt-4 border-t dark:border-gray-700">
                    <nav>
                      <ul className="flex items-center justify-center space-x-4">
                        <li>
                          <button
                            onClick={handlepre}
                            disabled={page === 1}
                            className={`px-4 py-2 text-gray-700 dark:text-gray-400 rounded-md transition ${
                              page === 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            Previous
                          </button>
                        </li>
                        <li>
                          <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                            {page}
                          </span>
                        </li>
                        <li>
                          <button
                            onClick={handlenext}
                            disabled={data.length <= 9}
                            className={`px-4 py-2 text-gray-700 dark:text-gray-400 rounded-md transition ${
                              data.length <= 4
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
      {/*  */}
    </div>
  );
}
