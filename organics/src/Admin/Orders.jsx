import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import TableIndid from "./Loding/TableIndid";
import CodOrders from "./CodOrders";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl } from "../../config/confg";
export default function Orders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

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
  return (
    <div>
      <ToastContainer />
      <AdminNav />
      <hr />
      <div className="flex">
        <aside className="w-1/5 flex ">
          <SuperDashBoard show_descrition={false} />
        </aside>

        {/* Right Section (Table) */}

        {load ? (
          <TableIndid />
        ) : (
          <main className="w-4/5  rounded bg-white ">
            <section className="flex items-center justify-center p-6">
              <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {" "}
                    List of PayPal Orders
                  </h2>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                      <tr className="text-sm text-left bg-green-500 text-white">
                        <th className="px-6 py-3 text-left">User ID</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">CVV</th>
                        <th className="px-6 py-3 text-left">Expiry Date</th>
                        <th className="px-6 py-3 text-left">Card No</th>
                        <th className="px-6 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((ele, i) => (
                        <tr
                          key={i}
                          className="text-sm border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4">{ele.id}</td>
                          <td className="px-6 py-4 font-medium">
                            {ele.name.toUpperCase()}
                          </td>
                          <td className="px-6 py-4">{ele.email}</td>
                          <td className="px-6 py-4">{ele.phone}</td>
                          <td className="px-6 py-4">{ele.cvv}</td>
                          <td className="px-6 py-4">{ele.exD}</td>
                          <td className="px-6 py-4">{ele.cardNumber}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(ele.id)}
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
                      <ul className="flex space-x-2">
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
            <CodOrders />
          </main>
        )}
      </div>
      {/*  */}
    </div>
  );
}
