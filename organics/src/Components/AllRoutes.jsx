// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Blog from "../Pages/Blog";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
// import Cart from "../Pages/Cart";
import OrganicPro from "../Pages/OrganicPro";
// import SingleProducts from "../Pages/SingleProducts";
import AdminDashBoard from "../Admin/AdminDashBoard";
import ProtectedRoute, { AdminProtectedRoute } from "./ProtectedRoute";
import AdminUsers from "../Admin/AdminUsers";
// import ChakOutPage from "../Pages/ChakOutPage";
import ShpoingDone from "../Pages/ShpoingDone";
import UpCaoming from "../Pages/UpCaoming";
import Orders from "../Admin/Orders";
import SuperDashBoard from "../Admin/SuperDashBoard";
// import { useEffect, useState } from "react";
import AdminAnalytics from "../Admin/AdminAnalytics";
import PageNotFound from "./PageNotFound";
import AdminProductView from "../Admin/ProductView";
import ProductDetailsPage from "../Pages/Cards/ProdutsDetailsPage";
import CartPage from "../Pages/CartPage";
import UserProfile from "../Pages/UserProfile";
import OrderReview from "../Pages/OrderComponents/OrderReview";
import CheckoutPage from "../Pages/OrderComponents/CheckoutPage";
import ThankyouPage from "../Pages/OrderComponents/ThankyouPage";
import BugReport from "../Pages/BugReport";
import BugReportListing from "../Admin/BugReportListing";
import SalersLst from "../Admin/SalersLst";
export default function AllRoutes() {
  // const [isOrgAdmin, setisOrgAdmin] = useState(false);

  // useEffect(() => {
  //   const isAdmin = sessionStorage.getItem("isOrganicAdmin");

  //   setisOrgAdmin(isAdmin === "true");
  // }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/upcoming" element={<UpCaoming />}></Route>
        <Route path="/bug-report" element={<BugReport />}></Route>
        <Route
          path="/delivery"
          element={<ProtectedRoute component={ShpoingDone} />}
        ></Route>
        <Route
          path="/checkout"
          element={<ProtectedRoute component={CheckoutPage} />}
        ></Route>
        <Route
          path="/cartpage"
          element={<ProtectedRoute component={CartPage} />}
        ></Route>
        <Route
          path="/organicsproducts"
          element={<OrganicPro />}
          // element={<ProtectedRoute component={OrganicPro} />}
        ></Route>
        <Route
          path="/productdiscription/:id"
          element={<ProductDetailsPage />} // <SingleProducts />
        ></Route>
        <Route
          path="/user-profile"
          element={<ProtectedRoute component={UserProfile} />}
        />
        <Route
          path="/order-review"
          element={<ProtectedRoute component={OrderReview} />}
        />
        <Route
          path="/thank-you"
          element={<ProtectedRoute component={ThankyouPage} />}
        />
        {/* {isOrgAdmin && (
          <> */}
        <Route
          path="/admin-portal"
          element={<AdminProtectedRoute component={SuperDashBoard} />}
        />
        <Route
          path="/adminproducts/:id"
          element={<AdminProtectedRoute component={AdminDashBoard} />}
        />
        <Route
          path="/adminusers"
          element={<AdminProtectedRoute component={AdminUsers} />}
        />
        <Route
          path="/orders"
          element={<AdminProtectedRoute component={Orders} />}
        />
        <Route
          path="/admin-analytics"
          element={<AdminProtectedRoute component={AdminAnalytics} />}
        />
        <Route
          path="/admin-products-view/:id"
          element={<AdminProtectedRoute component={AdminProductView} />}
        />
        <Route
          path="/bug-report-list"
          element={<AdminProtectedRoute component={BugReportListing} />}
        />
        <Route
          path="/salers"
          element={<AdminProtectedRoute component={SalersLst} />}
        />

        {/* </>
        )} */}
      </Routes>
    </div>
  );
}
