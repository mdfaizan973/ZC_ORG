"use client";

import { useState } from "react";
import { AiFillBug, AiFillDashboard } from "react-icons/ai";
import {
  FiShoppingBag,
  FiShoppingCart,
  FiBarChart2,
  FiCalendar,
  FiUsers,
  FiUserCheck,
  FiMenu,
  FiX,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getSessionData } from "../../utils/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const allMenuItems = [
    { title: "Dashboard", icon: <AiFillDashboard />, route: "/admin-portal" },
    {
      title: "Products",
      icon: <FiShoppingBag />,
      route: `/adminproducts/${getSessionData("_id")}`,
    },
    { title: "Orders", icon: <FiShoppingCart />, route: "/orders" },
    { title: "Analytics", icon: <FiBarChart2 />, route: "/admin-analytics" },
    // {
    //   title: "Upcoming Products",
    //   icon: <FiCalendar />,
    //   route: "/upoming-products",
    // },
    {
      title: "Users",
      icon: <FiUsers />,
      route: "/adminusers",
      onlyAdmin: getSessionData("role_id") == 1,
    },
    {
      title: "Sellers",
      icon: <FiUserCheck />,
      route: "/salers",
      onlyAdmin: getSessionData("role_id") == 1,
    },
    {
      title: "Bug Report",
      icon: <AiFillBug />,
      route: "/bug-report-list",
      onlyAdmin: getSessionData("role_id") == 1,
    },
    { title: "Store", icon: <FiHome />, route: "/" },
  ];

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(() => {
    // Check the current route and set the active index accordingly
    const currentPath = window.location.pathname;
    const activeIndex = allMenuItems.findIndex(
      (item) => item.route === currentPath
    );
    return activeIndex !== -1 ? activeIndex : 0;
  });

  const handleAdminDashboardRoute = (link, index) => {
    navigate(link);
    setActivePage(index);
  };

  const menuItems = allMenuItems.filter(
    (item) => item.onlyAdmin === undefined || item.onlyAdmin
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-md shadow-lg"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"} 
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-600 text-white font-bold text-xl">
              <img
                src="https://i.pinimg.com/736x/a6/19/71/a619716b7be42ceaf64215ec4b7ad1ed.jpg"
                alt="Displayed"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {!isCollapsed && (
              <h1 className="ml-3 text-xl font-semibold text-gray-800">
                Organic Store
              </h1>
            )}
          </div>
          <button
            className="hidden md:block text-gray-500 hover:text-green-600"
            onClick={toggleSidebar}
          >
            <FiChevronRight
              className={`transition-transform duration-300 ${
                !isCollapsed ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => handleAdminDashboardRoute(item.route, index)}
                  className={`flex items-center p-3 text-gray-700 cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-600 group transition-all duration-200
                    ${
                      index === activePage ? "bg-green-50 text-green-600" : ""
                    }`}
                >
                  <div
                    className={`text-xl ${
                      index === activePage
                        ? "text-green-600"
                        : "text-gray-500 group-hover:text-green-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`ml-3 font-medium ${
                        index === activePage ? "text-green-600" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-6 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
                      {item.title}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={`absolute bottom-0 w-full p-4 border-t border-gray-100 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/88/17/52/8817525e87273d1299dafc1f5f8f1067.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-green-600"
            />
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">
                  {getSessionData("name")}
                </p>
                <p className="text-xs text-gray-500">
                  {getSessionData("email")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
