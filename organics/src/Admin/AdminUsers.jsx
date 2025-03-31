import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import TableIndid from "./Loding/TableIndid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashBoard from "./SuperDashBoard";
import { baseUrl, baseUrl2 } from "../../config/confg";
import Sidebar from "./Component/Sidebar";
import { deleteData, fetchData } from "../utils/utils";
import Loader from "../Pages/LoadingUI/Loader";
import { FiTrash2 } from "react-icons/fi";
export default function AdminUsers() {
  // const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [usersData, setUsersData] = useState([]);

  // const handlepre = () => {
  //   setPage(page - 1);
  // };
  // const handlenext = () => {
  //   setPage(page + 1);
  // };

  // Delete\
  const handledelteusers = async (id) => {
    await deleteData(`${baseUrl2}/users/${id}`);
    load_all_users();
  };

  useEffect(() => {
    load_all_users();
  }, []);

  const load_all_users = async () => {
    setLoad(true);
    const _usersData = await fetchData(`${baseUrl2}/users`);
    setLoad(false);
    setUsersData(_usersData.usersList);
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
          <div className="flex items-center bg-white mt-4 justify-center w-full h-[400px]">
            <Loader />
          </div>
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
                      {usersData.map((ele, i) => (
                        <tr
                          key={i}
                          className={`text-sm ${
                            i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                          }`}
                        >
                          <td className="px-6 py-4">
                            {ele._id.substring(0, 10)}...
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {ele.name.toUpperCase()}
                          </td>
                          <td className="px-6 py-4">{ele.email}</td>
                          <td className="px-6 py-4">
                            {ele.pass.substring(0, 10)}...
                          </td>
                          <td className="px-6 py-4">
                            {new Date(ele?.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              className="p-2  border border-red-600 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                              onClick={() => handledelteusers(ele._id)}
                              aria-label="Delete product"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* <div className="flex justify-end pt-6 border-t border-gray-300">
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
                </div> */}
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
