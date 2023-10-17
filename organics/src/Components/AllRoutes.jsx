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
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
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

        <Route path="/admindashboard" element={<AdminDashBoard />}></Route>
        <Route path="/adminusers" element={<AdminUsers />}></Route>
      </Routes>
    </div>
  );
}
