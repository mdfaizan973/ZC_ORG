import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import TableIndid from "./Loding/TableIndid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl } from "../../config/confg";
import { fetchData } from "./AdminAnalytics";
import Sidebar from "./Component/Sidebar";
export default function AdminUsers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const admingetdata = (page) => {
    setLoad(true);
    axios
      .get(`${baseUrl}/users?_limit=10&_page=${page}`)
      .then((res) => {
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

  const users_url = `${baseUrl}/users`;

  useEffect(() => {
    const load_Data = async () => {
      try {
        const prod_Data = await fetchData(users_url);
        setUsersData(prod_Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    load_Data();
  }, []);
  // Delete\
  const handledelteusers = (id) => {
    axios
      .delete(`${baseUrl}/users/${id}`)
      .then(function (res) {
        console.log(res);
        toast.success(`Deleted Usres with ID ${id} successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setData(data.filter((item) => item.id !== id));
      })
      .catch(function (error) {
        console.error("Error deleting:", error);
        toast.info(`This User can not be Deleted! `, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div>
      <ToastContainer />

      <AdminNav />
      {/* <br /> */}

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900  items-start">
        <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
          {/* <SuperDashBoard show_descrition={false} /> */}
          <Sidebar />
        </aside>

        {/* Right Section (Table) */}
        {load ? (
          <TableIndid />
        ) : (
          <main className="w-4/5  rounded p-4 ">
            <section className="items-start flex justify-center  min-h-screen font-poppins m-2">
              <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start px-6 pb-4 border-b border-gray-300">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    List of Users ({usersData?.length})
                  </h2>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                      <tr className="text-sm text-left bg-green-500  text-white">
                        <th className="px-6 py-3 font-medium">Users ID</th>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Email</th>
                        <th className="px-6 py-3 font-medium">Password</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((ele, i) => (
                        <tr
                          key={i}
                          className={`text-sm ${
                            i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                          }`}
                        >
                          <td className="px-6 py-4">{ele.id}</td>
                          <td className="px-6 py-4 font-semibold">
                            {ele.name.toUpperCase()}
                          </td>
                          <td className="px-6 py-4">{ele.email}</td>
                          <td className="px-6 py-4">{ele.pass}</td>
                          <td className="px-6 py-4">{ele.date}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handledelteusers(ele.id)}
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
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-300">
                  <nav aria-label="Page navigation">
                    <ul className="flex items-center justify-center space-x-4">
                      <li onClick={handlepre}>
                        <button
                          disabled={page === 1}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        >
                          Previous
                        </button>
                      </li>
                      <li>
                        <span className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                          {page}
                        </span>
                      </li>
                      <li onClick={handlenext}>
                        <button
                          disabled={data.length <= 9}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
