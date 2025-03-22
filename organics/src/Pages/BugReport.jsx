"use client";

import { useState } from "react";
import {
  FaBug,
  FaEnvelope,
  FaExclamationTriangle,
  FaPaperPlane,
} from "react-icons/fa";
import { MdPriorityHigh } from "react-icons/md";
import { getSessionData, hasToken, postData } from "../utils/utils";
import Navbar from "../Components/Navbar";
import { baseUrl2 } from "../../config/confg";

export default function BugReport() {
  const [formData, setFormData] = useState({
    name: getSessionData("name") || "",
    email: getSessionData("email") || "",
    description: "",
    priority: "Low",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.description) {
      setIsValid(false);
      return;
    }
    const bug_report = {
      user_name: formData.name,
      user_id: getSessionData("_id") || "",
      user_email: formData.email,
      bug: formData.description,
      priority: formData.priority,
      is_bug_fixed: "Work in progress",
    };

    const report = await postData(`${baseUrl2}/bug-report`, bug_report);
    if (report) {
      setIsValid(true);
      setSubmitted(true);
      setFormData({
        name: getSessionData("name") || "",
        email: getSessionData("email") || "",
        description: "",
        priority: "Low",
      });
    }
  };

  const priorityColors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };

  return (
    <>
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaBug className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Report a Bug
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Help us improve by reporting any issues you encounter
            </p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {!isValid && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          Please fill out all required fields.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaEnvelope className="mr-2 text-gray-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bug Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Please describe the issue in detail..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <MdPriorityHigh className="mr-2 text-gray-500" />
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    disabled={!hasToken()}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                  >
                    <FaPaperPlane className="mr-2" />
                    Submit Report
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-6">
                <div className="text-center mb-4">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Bug Report Submitted
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Thank you for helping us improve our product!
                  </p>
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Submitted Information:
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        Email:
                      </span>
                      <p className="text-sm text-gray-900">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        Description:
                      </span>
                      <p className="text-sm text-gray-900 whitespace-pre-line">
                        {formData.description}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">
                        Priority:
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          priorityColors[formData.priority]
                        }`}
                      >
                        {formData.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                >
                  Submit Another Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
