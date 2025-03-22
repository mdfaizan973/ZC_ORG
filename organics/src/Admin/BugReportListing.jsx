"use client";

import { useEffect, useState } from "react";
import {
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaUser,
  FaEllipsisV,
} from "react-icons/fa";
import {
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiRefreshCw,
  FiX,
  FiEye,
} from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Sidebar from "./Component/Sidebar";
import AdminNav from "./AdminNav";
import { fetchData, postData } from "../utils/utils";
import { baseUrl2 } from "../../config/confg";
import Loader from "../Pages/LoadingUI/Loader";

const BugReportListing = () => {
  const [bugs, setBugs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBugLoading, setIsBugLoading] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);

  // Filter bugs based on status, priority, and search term
  const filteredBugs = bugs.filter((bug) => {
    const matchesStatus =
      filterStatus === "All" || bug.is_bug_fixed === filterStatus;
    const matchesPriority =
      filterPriority === "All" || bug.priority === filterPriority;
    const matchesSearch =
      bug.bug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.user_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to get priority dot color
  const getPriorityDotColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-orange-500";
      case "Critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Function to get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "Fixed":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          color: "text-green-500 bg-green-50 border-green-200",
        };
      case "Work in progress":
        return {
          icon: <FaSpinner className="text-blue-500 animate-spin" />,
          color: "text-blue-500 bg-blue-50 border-blue-200",
        };
      default:
        return {
          icon: <FaBug className="text-gray-500" />,
          color: "text-gray-500 bg-gray-50 border-gray-200",
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    load_all_bugs();
  }, []);

  const load_all_bugs = async () => {
    setIsBugLoading(true);
    const data = await fetchData(`${baseUrl2}/bug-report`);
    setIsBugLoading(false);
    setBugs(data);
  };

  const changeStatus = async (data) => {
    const update = {
      ...data,
      is_bug_fixed: "Fixed",
    };
    await postData(`${baseUrl2}/bug-report/${data._id}`, update);
    load_all_bugs();
    setSelectedBug(null);
  };
  return (
    <>
      <AdminNav />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900  items-center">
        <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
          <Sidebar />
        </aside>
        {/* <aside className="h-full w-64 md-w-20 bg-white shadow-lg z-50"> */}
        {/* </aside> */}

        <main className="w-4/5 rounded p-4 ">
          <section className="flex flex-col justify-center min-h-screen font-poppins">
            {/* Header */}
            <>
              <header className="bg-white border-b border-gray-200s">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <FaBug className="text-white text-xl" />
                      </div>
                      <h1 className="text-xl font-bold text-gray-800">
                        Bug Report Dashboard
                      </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                        Total: {bugs.length}
                      </div>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                        <FiRefreshCw className="mr-2" /> Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 container mx-auto px-4 py-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                  <div className="p-4 flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search bugs or users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 self-end">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <FiFilter className="text-gray-500" />
                        <span>Filters</span>
                        <FiChevronDown
                          className={`transition-transform ${
                            isFilterOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {(filterStatus !== "All" ||
                        filterPriority !== "All" ||
                        searchTerm) && (
                        <button
                          onClick={() => {
                            setFilterStatus("All");
                            setFilterPriority("All");
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                        >
                          <FiX />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expandable Filters */}
                  {isFilterOpen && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Status
                          </label>
                          <select
                            id="status"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                          >
                            <option value="All">All Statuses</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Work in progress">
                              Work in Progress
                            </option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="priority"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Priority
                          </label>
                          <select
                            id="priority"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                          >
                            <option value="All">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bug List */}
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-4">
                  {isBugLoading ? (
                    <Loader />
                  ) : filteredBugs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse rounded-lg">
                        <thead>
                          <tr className="text-sm text-left bg-green-500 text-white">
                            <th className="px-6 py-3 font-medium">
                              Bug Details
                            </th>
                            <th className="px-6 py-3 font-medium">
                              Reported By
                            </th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Priority</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-center">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredBugs.map((bug) => {
                            const statusInfo = getStatusInfo(bug.is_bug_fixed);

                            return (
                              <tr
                                key={bug._id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-start">
                                    <div className="ml-2">
                                      <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                                        {bug.bug}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        ID: {bug._id.substring(0, 8)}...
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                      <FaUser className="text-green-600 text-xs" />
                                    </div>
                                    <div className="ml-3">
                                      <div className="text-sm font-medium text-gray-900">
                                        {bug.user_name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {bug.user_email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                                  >
                                    {statusInfo.icon}
                                    <span className="ml-1">
                                      {bug.is_bug_fixed}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full ${getPriorityDotColor(
                                        bug.priority
                                      )} mr-2`}
                                    ></div>
                                    <span className="text-sm text-gray-900">
                                      {bug.priority}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex flex-col">
                                    <span>
                                      {formatDate(bug.bug_report_date)}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {formatTime(bug.bug_report_date)}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button
                                    onClick={() => setSelectedBug(bug)}
                                    className="text-green-600 hover:text-green-900 mr-3"
                                  >
                                    <FiEye />
                                  </button>
                                  <button
                                    className="text-gray-600 hover:text-gray-900"
                                    onClick={() => changeStatus(bug)}
                                  >
                                    <FiChevronRight />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaBug className="text-2xl text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        No bugs found
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto text-sm">
                        Try adjusting your filters or search criteria to find
                        what you're looking for.
                      </p>
                      <button
                        onClick={() => {
                          setFilterStatus("All");
                          setFilterPriority("All");
                          setSearchTerm("");
                        }}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bug Detail Modal */}
              {selectedBug && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Bug Details
                      </h3>
                      <button
                        onClick={() => setSelectedBug(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <FaUser className="text-green-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {selectedBug.user_name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {selectedBug.user_email}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                selectedBug.priority
                              )}`}
                            >
                              {selectedBug.priority} Priority
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                getStatusInfo(selectedBug.is_bug_fixed).color
                              }`}
                            >
                              {getStatusInfo(selectedBug.is_bug_fixed).icon}
                              <span className="ml-1">
                                {selectedBug.is_bug_fixed}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                            Bug Description
                          </h4>
                          <p className="text-gray-700">{selectedBug.bug}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                              Bug ID
                            </h4>
                            <p className="text-gray-700 font-mono">
                              {selectedBug._id}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                              User ID
                            </h4>
                            <p className="text-gray-700 font-mono">
                              {selectedBug.user_id}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                              Report Date
                            </h4>
                            <p className="text-gray-700">
                              {formatDate(selectedBug.bug_report_date)}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                              Report Time
                            </h4>
                            <p className="text-gray-700">
                              {formatTime(selectedBug.bug_report_date)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setSelectedBug(null)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => changeStatus(selectedBug)}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          </section>
        </main>
      </div>
    </>
  );
};

export default BugReportListing;
