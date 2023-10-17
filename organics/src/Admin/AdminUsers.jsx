// import React from 'react'

import AdminNav from "./AdminNav";

export default function AdminUsers() {
  return (
    <div>
      <AdminNav />
      <section className="items-center lg:flex bg-gray-50 lg:h-screen font-poppins ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="pt-4 bg-white rounded shadow ">
            <div className="flex px-6 pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-gray-400">Table</h2>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                    <th className="px-6 pb-3 font-medium">Users ID</th>
                    <th className="px-6 pb-3 font-medium ">Date </th>
                    <th className="px-6 pb-3 font-medium">Email </th>
                    <th className="px-6 pb-3 font-medium">Password </th>
                    <th className="px-6 pb-3 font-medium">Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-xs bg-gray-100 dark:text-gray-400 ">
                    <td className="px-6 py-5 font-medium">018276td45</td>
                    <td className="px-6 py-5 font-medium ">08.4.2021</td>
                    <td className="px-6 py-5 font-medium ">abc@gmail.com</td>
                    <td>
                      <span className="inline-block px-2 py-1 text-center text-green-600 bg-green-100 rounded-full dark:text-green-700 dark:bg-green-200">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-5 ">
                      <a
                        href="#"
                        className="px-4 py-2 font-medium text-red-500 border border-red-500 rounded-md dark:text-red-300 dark:border-red-300 dark:hover:bg-red-300 dark:hover:text-gray-700 hover:text-gray-100 hover:bg-red-500"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
