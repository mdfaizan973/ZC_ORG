// import React from 'react'
import { useEffect, useState } from "react";
import {
  AiFillAndroid,
  AiFillBug,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { getSessionData, hasToken } from "../utils/utils";

export default function Sidebar() {
  const [isOrgAdmin, setisOrgAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = getSessionData("role_id");

    setisOrgAdmin(isAdmin === "true");
  }, []);
  return (
    <div>
      <div className="sidebar  bg-opacity-80 shadow-md backdrop-blur-2xl backdrop-saturate-200 text-black flex flex-col">
        <div className="sidebar-buttons mt-auto p-4">
          {/* <RouterLink to="/">
            <a
              href="#"
              className="mr-4 block cursor-pointer py-1.5 font-sans text-xl font-bold leading-normal text-inherit antialiased font-semibold"
            >
              <span className="text-green-600">Organic Store</span>
              <img
                className=""
                src="https://user-images.githubusercontent.com/106812942/275217471-417cd4b2-e456-4413-b8d0-4036e7537692.png"
              />
            </a>
          </RouterLink> */}

          <RouterLink to="/cartpage">
            <button
              className="middle none center  rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-2 px-4 mr-1 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              data-ripple-light="true"
            >
              <AiOutlineShoppingCart />
            </button>
          </RouterLink>
          <RouterLink to={hasToken() ? "/user-profile" : "/login"}>
            <button
              className="middle none center  rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              data-ripple-light="true"
            >
              <AiOutlineUser />
            </button>
          </RouterLink>
          <RouterLink to={"/bug-report"}>
            {" "}
            <button
              className="middle none center  rounded-lg bg-gradient-to-tr from-red-600 to-red-400 py-2 px-4 ml-1 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              data-ripple-light="true"
            >
              <AiFillBug />
            </button>
          </RouterLink>
          {[1, 2].includes(getSessionData("role_id")) && (
            <RouterLink to="/admin-portal">
              <button
                className="middle none center  rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 ml-1 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <AiFillAndroid />
              </button>
            </RouterLink>
          )}
        </div>

        <ul className="menu p-4">
          <li className="menu-item mb-5">
            <RouterLink to="/">
              <a href="#" className="menu-link">
                Home
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/organicsproducts">
              <a href="#" className="menu-link">
                ORG Products
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/organicsproducts">
              <a href="#" className="menu-link">
                Fruits
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/organicsproducts">
              <a href="#" className="menu-link">
                Vegetables
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/organicsproducts">
              <a href="#" className="menu-link">
                Dairy
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/upcoming">
              <a href="#" className="menu-link">
                Upcoming Products
              </a>
            </RouterLink>
          </li>
          <li className="menu-item mb-5">
            <RouterLink to="/blogs">
              <a href="#" className="menu-link">
                Blogs
              </a>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
