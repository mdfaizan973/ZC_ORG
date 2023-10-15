// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Blog from "../Pages/Blog";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
      </Routes>
    </div>
  );
}
