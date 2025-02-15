import { useState, useEffect } from "react";
import axios from "axios";
import TableIndid from "./Loding/TableIndid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CodOrders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  const admingetdata = (page) => {
    setLoad(true);
    axios
      .get(`https://orgaincspro.onrender.com/codorders?_limit=10&_page=${page}`)
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

  const handlePre = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  //   Delete

  const handleDelete = (id) => {
    axios
      .delete(`https://orgaincspro.onrender.com/codorders/${id}`)
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
      {load ? (
        <TableIndid />
      ) : (
        <section className="flex items-center justify-center p-6">
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Cash On Delivery Orders
              </h2>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="text-sm text-left bg-green-500 text-white">
                    <th className="p-3 text-left">User ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ele, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-3">{ele.id}</td>
                      <td className="p-3">{ele.cName}</td>
                      <td className="p-3">{ele.cEmail}</td>
                      <td className="p-3">{ele.cPhone}</td>
                      <td className="p-3">{ele.CAddress}</td>
                      <td className="p-3 flex gap-2">
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
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePre}
                disabled={page === 1}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-200 rounded">{page}</span>
              <button
                onClick={handleNext}
                disabled={data.length <= 9}
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
