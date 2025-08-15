// import React from 'react'
import { useEffect, useState } from "react";
import {
  AiFillAndroid,
  // AiOutlineShopping,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiFillBug,
} from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getSessionData, hasToken } from "../utils/utils";
export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isOrgAdmin, setIsOrgAdmin] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    let roleId = getSessionData("role_id");

    if ([1, 2].includes(roleId)) {
      setIsOrgAdmin(true);
    } else {
      setIsOrgAdmin(false);
    }
  }, []);

  return (
    <div className="mb-[60px] md:mb-20">
      <nav className="fixed  inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div>
          <div className="container mx-auto flex items-center justify-between text-gray-900">
            <RouterLink to="/">
              <a
                href="#"
                className="mr-4 block cursor-pointer py-1.5 font-sans text-xl font-bold leading-normal text-inherit antialiased font-semibold"
              >
                <span className="text-green-600">Organic Store</span>
                {/* <img
                className=""
                src="https://user-images.githubusercontent.com/106812942/275217471-417cd4b2-e456-4413-b8d0-4036e7537692.png"
              /> */}
              </a>
            </RouterLink>

            <ul className="hidden items-center gap-6 lg:flex">
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold ">
                <RouterLink to="/">
                  <a className="flex items-center" href="#">
                    Home
                  </a>
                </RouterLink>
              </li>
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to={`/organicsproducts?product=all`}>
                  <a className="flex items-center" href="#">
                    ORG Products
                  </a>
                </RouterLink>
              </li>
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to={`/organicsproducts?product=fruits`}>
                  <a className="flex items-center" href="#">
                    Fruits
                  </a>
                </RouterLink>
              </li>
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to={`/organicsproducts?product=vegetables`}>
                  <a className="flex items-center" href="#">
                    Vegetables
                  </a>
                </RouterLink>
              </li>{" "}
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to={`/organicsproducts?product=dairy`}>
                  <a className="flex items-center" href="#">
                    Dairy
                  </a>
                </RouterLink>
              </li>
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to="/upcoming">
                  <a className="flex items-center" href="#">
                    Upcoming Products
                  </a>
                </RouterLink>
              </li>
              <li className="block p-1 font-sans text-bs font-normal leading-normal text-inherit antialiased font-semibold">
                <RouterLink to="/blogs">
                  <a className="flex items-center" href="#">
                    Blogs
                  </a>
                </RouterLink>
              </li>
            </ul>
            <div>
              <RouterLink to="/cartpage">
                <button
                  className="middle none center hidden rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-2 px-4 mr-1 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                  data-ripple-light="true"
                >
                  {/* <AiOutlineShopping /> */}
                  <AiOutlineShoppingCart />
                </button>
              </RouterLink>

              <RouterLink to={hasToken() ? "/user-profile" : "/login"}>
                {" "}
                <button
                  className="middle none center hidden rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                  data-ripple-light="true"
                >
                  <AiOutlineUser />
                </button>
              </RouterLink>
              {/* -- */}

              <RouterLink to={"/bug-report"}>
                {" "}
                <button
                  className="middle none center hidden rounded-lg bg-purple-600 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                  data-ripple-light="true"
                >
                  <AiFillBug />
                </button>
              </RouterLink>

              {isOrgAdmin && (
                <RouterLink to="/admin-portal">
                  <button
                    className="middle none center hidden rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 ml-1 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    data-ripple-light="true"
                  >
                    <AiFillAndroid />
                  </button>
                </RouterLink>
              )}
            </div>

            <button
              onClick={toggleSidebar}
              className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
              data-collapse-target="navbar"
            >
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          {showSidebar && <Sidebar />}
          {/* here will be the Mobile navbar */}
        </div>
      </nav>
    </div>
  );
}
