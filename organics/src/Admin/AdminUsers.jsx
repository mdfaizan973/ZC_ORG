import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import TableIndid from "./Loding/TableIndid";

export default function AdminUsers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  const admingetdata = (page) => {
    setLoad(true);
    axios
      .get(`http://localhost:3030/users?_limit=5&_page=${page}`)
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

  return (
    <div>
      <AdminNav />

      {load ? (
        <TableIndid />
      ) : (
        <section className="items-center lg:flex bg-gray-50 lg:h-screen font-poppins ">
          <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="pt-4 bg-white rounded shadow ">
              <div className="flex px-6 pb-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-gray-400">
                  List of Users
                </h2>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                      <th className="px-6 pb-3 font-medium">Users ID</th>
                      <th className="px-6 pb-3 font-medium ">Name </th>
                      <th className="px-6 pb-3 font-medium">Email </th>
                      <th className="px-6 pb-3 font-medium">Password </th>
                      <th className="px-6 pb-3 font-medium ">Date </th>
                      <th className="px-6 pb-3 font-medium">Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((ele, i) => (
                      <tr
                        key={i}
                        className="text-xs bg-gray-100 dark:text-gray-400 "
                      >
                        <td className="px-6 py-5 font-medium">{ele.id}</td>
                        <td className="px-6 py-5 font-medium ">
                          {ele.name.toUpperCase()}
                        </td>
                        <td className="px-6 py-5 font-medium ">{ele.email}</td>
                        <td className="px-6 py-5 font-medium ">{ele.pass}</td>
                        <td className="px-6 py-5 font-medium ">{ele.date}</td>

                        <td className="px-6 py-5 ">
                          <button
                            // onClick={onclick}
                            className="px-4 py-2 font-medium text-red-500 border border-red-500 rounded-md dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-gray-700 hover:text-gray-100 hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end pt-4 mt-4 border-t dark:border-gray-700">
                  <nav aria-label="page-navigation">
                    <ul className="flex list-style-none">
                      <li className="page-item " onClick={handlepre}>
                        <button
                          disabled={page == 1}
                          href=""
                          className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                        >
                          Previous
                        </button>
                      </li>
                      <li className="page-item ">
                        <a
                          href="#"
                          className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3 "
                        >
                          {page}
                        </a>
                      </li>
                      <li className="page-item " onClick={handlenext}>
                        <button
                          disabled={data.length <= 4}
                          href="#"
                          className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
