import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Sidebar from "./Component/Sidebar";
import { FaUser } from "react-icons/fa";
import { FiEye, FiRefreshCw, FiSearch } from "react-icons/fi";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { deleteData, fetchData, postData } from "../utils/utils";
import { baseUrl2 } from "../../config/confg";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import Loader from "../Pages/LoadingUI/Loader";

export default function SalersLst() {
  const [salersReqList, setSalerRequestData] = useState([]);
  const [salerListData, setSalerListData] = useState([]);
  const [activeTab, setActiveTab] = useState("salerRequest");
  const [salerLoading, setSalerLoading] = useState(false);

  const load_saler_request_list = async () => {
    const list_req = await fetchData(`${baseUrl2}/saler`);
    return list_req;
  };
  const load_saler_list = async () => {
    const list_saler = await fetchData(`${baseUrl2}/users`);
    return list_saler?.usersList;
  };

  useEffect(() => {
    fetchAllSalerData();
  }, []);

  const fetchAllSalerData = async () => {
    try {
      setSalerLoading(true);
      const [requests, salers] = await Promise.all([
        load_saler_request_list(),
        load_saler_list(),
      ]);
      setSalerLoading(false);
      setSalerRequestData(requests);
      // setSalerListData(salers);

      prepareUserListata(requests, salers);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const prepareUserListata = (requests, salers) => {
    const salerDataList = salers.filter(
      (ele) => ele.role_id == 2 || ele.role_id == 1
    );

    setSalerListData(salerDataList);
  };

  const handleRefresh = () => {
    fetchAllSalerData();
  };

  const handleUpdateSaler = async (salerInfo) => {
    const userData = await load_saler_list();
    const getUser = userData.find((ele) => ele.email == salerInfo.saler_email);
    const url = `${baseUrl2}/users/${getUser._id}`;
    const newData = {
      ...getUser,
      description: salerInfo.sell_description,
      businessName: salerInfo.saler_business_name,
      role_id: 2,
    };

    await postData(url, newData, "PUT");
    fetchAllSalerData();

    deleteSalerData(salerInfo._id);
  };

  const deleteSalerData = async (salerId) => {
    const url = `${baseUrl2}/saler/${salerId}`;

    await deleteData(url, false);
    fetchAllSalerData();
  };

  const handleRemoveSaler = async (id) => {
    const url = `${baseUrl2}/users/${id}`;
    const newData = {
      role_id: 3,
    };
    await postData(url, newData, "PUT");
    fetchAllSalerData();
  };
  return (
    <>
      <AdminNav />

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900  items-center">
        <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
          <Sidebar />
        </aside>

        <main className="w-4/5 rounded p-4 ">
          <section className="flex flex-col justify-center min-h-screen font-poppins">
            <header className="bg-white border-b border-gray-200">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Saler Dashboard
                  </h1>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                    Total Requests: {salersReqList?.length}
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                    Active Salers: {salerListData?.length}
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    onClick={handleRefresh}
                  >
                    <FiRefreshCw className="mr-2" /> Refresh
                  </button>
                </div>
              </div>
            </header>

            <div className="flex-1 container mx-auto px-4 py-6">
              {/* Tab code */}

              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("salerRequest")}
                  className={`flex-1 py-2 px-4 text-center font-medium flex items-center justify-center gap-2 
  ${
    activeTab === "salerRequest"
      ? "border-b-2 border-green-500 text-green-600"
      : "text-gray-500 hover:text-green-500"
  }`}
                >
                  <FaUserPlus /> Saler Request
                </button>
                <button
                  onClick={() => setActiveTab("ourSaler")}
                  className={`flex-1 py-2 px-4 text-center font-medium flex items-center justify-center gap-2 
  ${
    activeTab === "ourSaler"
      ? "border-b-2 border-green-500 text-green-600"
      : "text-gray-500 hover:text-green-500"
  }`}
                >
                  <FaUsers /> Our Saler
                </button>
              </div>
              {salerLoading ? (
                <div className="flex items-center justify-center h-[400px] w-full">
                  <Loader />
                </div>
              ) : (
                <div className="mt-6">
                  {activeTab === "salerRequest" && (
                    <div className="p-4 border rounded-lg shadow bg-white">
                      <SalerRequestTable
                        salersReqList={salersReqList}
                        handleUpdateSaler={handleUpdateSaler}
                        deleteSalerData={deleteSalerData}
                      />
                    </div>
                  )}
                  {activeTab === "ourSaler" && (
                    <>
                      <SalerTable
                        salerListData={salerListData}
                        handleRemoveSaler={handleRemoveSaler}
                      />
                    </>
                  )}
                </div>
              )}
              {/* Tab Content */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

import { FaEye } from "react-icons/fa";

const SalerTable = ({ salerListData, handleRemoveSaler }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSaler, setSelectedSaler] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (saler) => {
    setSelectedSaler(saler);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSaler(null);
    setShowModal(false);
  };

  const filteredSalers = salerListData.filter((saler) =>
    saler.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log(selectedSaler);
  return (
    <>
      {/* Search Bar */}
      <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Salers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-4 border rounded-lg shadow bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="text-sm text-left bg-green-500 text-white">
                <th className="py-2 px-4 text-left">Saler Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Access Date</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalers.map((saler, index) => (
                <tr key={index} className="border-t hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {saler.name} ({saler.role_id})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {saler.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(saler.updatedAt).toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => openModal(saler)}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSalers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No salers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Modal */}
      {showModal && selectedSaler && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-green-600">
              Saler Details
            </h3>

            <div className="space-y-4">
              {/* Row 1: Name + Email */}
              <div className="flex  flex-wrap">
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 w-full sm:w-1/2">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                    Name
                  </h4>
                  <p className="text-sm text-gray-700">{selectedSaler.name}</p>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 w-full sm:w-1/2">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                    Email
                  </h4>
                  <p className="text-sm text-gray-700">{selectedSaler.email}</p>
                </div>
              </div>

              {/* Row 2: Gender + Address */}
              <div className="flex  flex-wrap">
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 w-full sm:w-1/2">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                    Gender
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedSaler.gender}
                  </p>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 w-full sm:w-1/2">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                    Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedSaler.address}
                  </p>
                </div>
              </div>

              {/* Business */}
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                  Business
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedSaler.businessName}
                </p>
              </div>

              {/* Applied Date */}
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                  Applied Date
                </h4>
                <p className="text-sm text-gray-700">
                  {new Date(selectedSaler.updatedAt).toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedSaler.description}
                </p>
              </div>

              {/* Profile Image */}
              {selectedSaler.profile_image && (
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                    Profile Image
                  </h4>
                  <img
                    src={selectedSaler.profile_image}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              )}
            </div>

            <button
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              onClick={() => handleRemoveSaler(selectedSaler._id)}
            >
              Update Role
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const SalerRequestTable = ({
  salersReqList,
  handleUpdateSaler,
  deleteSalerData,
}) => {
  const [showSalserModel, setShowSalerModel] = useState(false);
  const [showSalserInfo, setShowSalerInfo] = useState({});

  const handleSalerInfo = (data) => {
    setShowSalerInfo(data);
    setShowSalerModel(true);
  };

  return (
    <>
      {" "}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="text-sm text-left bg-green-500 text-white">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Business Name</th>
              <th className="px-6 py-3 font-medium">Applied Date</th>
              <th className="px-6 py-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salersReqList?.map((ele, i) => (
              <tr key={ele._id} className="hover:bg-gray-50 transition-colors">
                {" "}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaUser className="text-green-600 text-xs" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {ele.saler_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {ele.saler_email}
                  </div>
                </td>{" "}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {ele.saler_business_name}
                  </div>
                </td>{" "}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(ele.applied_date).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleSalerInfo(ele)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <FiEye />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deleteSalerData(ele._id)}
                  >
                    <AiFillCloseCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSalserModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowSalerModel(false)}
            >
              &times;
            </button>

            {/* Header with Name and ID */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <FiUser className="text-blue-600" />
                {showSalserInfo.saler_name}
              </h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                <HiOutlineIdentification />
                {showSalserInfo._id}
              </p>
            </div>

            {/* Box-Style Info Section */}
            <div className="grid gap-4">
              {/* Email Box */}
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <FiMail className="text-blue-600 text-xl" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">Email</p>
                  <p className="text-sm text-gray-800">
                    {showSalserInfo.saler_email}
                  </p>
                </div>
              </div>

              {/* Business Box */}
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <FiBriefcase className="text-blue-600 text-xl" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Business
                  </p>
                  <p className="text-sm text-gray-800">
                    {showSalserInfo.saler_business_name}
                  </p>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <FiFileText className="text-blue-600 text-xl" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Description
                  </p>
                  <p className="text-sm text-gray-800">
                    {showSalserInfo.sell_description || "N/A"}
                  </p>
                </div>
              </div>

              {/* Date Box */}
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                <FiCalendar className="text-blue-600 text-xl" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Applied On
                  </p>
                  <p className="text-sm text-gray-800">
                    {new Date(showSalserInfo.applied_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Update Button */}
            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
              onClick={() => handleUpdateSaler(showSalserInfo)}
            >
              ✅ Update Status
            </button>
          </div>
        </div>
      )}
    </>
  );
};
