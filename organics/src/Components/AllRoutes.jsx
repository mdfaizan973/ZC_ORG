// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Blog from "../Pages/Blog";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import Cart from "../Pages/Cart";
import OrganicPro from "../Pages/OrganicPro";
import SingleProducts from "../Pages/SingleProducts";
import AdminDashBoard from "../Admin/AdminDashBoard";
import ProtectedRoute from "./ProtectedRoute";
import AdminUsers from "../Admin/AdminUsers";
import ChakOutPage from "../Pages/ChakOutPage";
import ShpoingDone from "../Pages/ShpoingDone";
import UpCaoming from "../Pages/UpCaoming";
import Orders from "../Admin/Orders";
import SuperDashBoard from "../Admin/SuperDashBoard";
import { useEffect, useState } from "react";
import AdminAnalytics from "../Admin/AdminAnalytics";
export default function AllRoutes() {
  const [isOrgAdmin, setisOrgAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isOrganicAdmin");

    setisOrgAdmin(isAdmin === "true");
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/upcoming" element={<UpCaoming />}></Route>

        <Route
          path="/delivery"
          element={<ProtectedRoute component={ShpoingDone} />}
        ></Route>
        <Route
          path="/checkout"
          element={<ProtectedRoute component={ChakOutPage} />}
        ></Route>
        <Route
          path="/cartpage"
          element={<ProtectedRoute component={Cart} />}
        ></Route>
        <Route
          path="/organicsproducts"
          element={<OrganicPro />}
          // element={<ProtectedRoute component={OrganicPro} />}
        ></Route>
        <Route
          path="/productdiscription/:id"
          element={<ProtectedRoute component={SingleProducts} />}
        ></Route>

        {isOrgAdmin && (
          <>
            <Route path="/admin-portal" element={<SuperDashBoard />}></Route>
            <Route path="/adminproducts" element={<AdminDashBoard />}></Route>
            <Route path="/adminusers" element={<AdminUsers />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/admin-analytics" element={<AdminAnalytics />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}
