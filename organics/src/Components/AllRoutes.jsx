// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Blog from "../Pages/Blog";
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
      </Routes>
    </div>
  );
}
