// import { useState } from "react";

import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchData, hasToken, postData } from "./utils/utils";
import { baseUrl2 } from "../config/confg";

function App() {
  // App.js or Layout.jsx
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let latestOrders;
        if (hasToken()) {
          latestOrders = await fetchData(`${baseUrl2}/orders`);
        }
        // make the api for current user above

        // Filter orders that actually need an update
        const ordersToUpdate = latestOrders.filter(
          (order) =>
            order.order_status === "Processing" ||
            order.order_status === "Shipped" ||
            (order.order_status === "Delivered" &&
              order.payment_status !== "paid")
        );

        if (ordersToUpdate.length === 0) {
          console.log("All orders are up to date. Skipping API calls.");
          return; // Exit early to prevent unnecessary API calls
        }

        // Update only the necessary orders
        await Promise.all(
          ordersToUpdate.map(async (order) => {
            let updatedData = {};

            if (order.order_status === "Processing") {
              updatedData.order_status = "Shipped";
            } else if (order.order_status === "Shipped") {
              updatedData.order_status = "Delivered";
            } else if (
              order.order_status === "Delivered" &&
              order.payment_status !== "paid"
            ) {
              updatedData.payment_status = "paid";
            }

            // Send request only if there's an update needed
            if (Object.keys(updatedData).length > 0) {
              await postData(
                `${baseUrl2}/orders/${order._id}`,
                updatedData,
                "PUT",
                false
              );
            }
          })
        );

        console.log("Only required orders updated!");
      } catch (error) {
        console.error("Update failed:", error);
      }
    }, 20 * 1000); // Runs every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const [showIntitlLoder, setInitialLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoader(false);
    }, 2000);
  }, []);
  return (
    <>
      {showIntitlLoder ? (
        <WebSiteInitialLoader />
      ) : (
        <>
          <ToastContainer />
          <ScrollToTop />
          <AllRoutes />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

const WebSiteInitialLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Increment to reach 100% in ~2 seconds
      });
    }, 80);

    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center justify-center p-8 rounded-lg">
        <div className="w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-green-500 p-1">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://i.pinimg.com/736x/a6/19/71/a619716b7be42ceaf64215ec4b7ad1ed.jpg"
            alt="Loading"
          />
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Welcome to Our Website
        </h2>

        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-green-600 font-medium">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
};

// !fruits, vegetables, grains, dairy products and meat
// ?category=vegetables

// !fruits
// Apples
// Bananas
// Strawberries
// Blueberries
// Oranges
// Grapes
// Kiwi
// Peaches
// Pears
// Plums
// Cherries
// Mangoes

// !vegetables
// Spinach
// Carrots
// Broccoli
// Tomatoes
// Bell Peppers
// Kale
// Cucumbers
// Zucchini
// Green Beans
// Eggplant
// Radishes
// Swiss Chard

// !grains
// Wheat Bread
// Rice Cakes
// Quinoa Salad
// Oatmeal
// Barley Soup
// Spaghetti
// Corn Tortillas
// Buckwheat Pancakes
// Millet Porridge
// Rye Crackers
// Couscous Salad
// Farro Risotto

// !dairy
// Milk
// Butter
// Cheese
// Yogurt
// Sour Cream
// Cottage Cheese
// Cream Cheese
// Whipping Cream
// Ice Cream
// Evaporated Milk
// Condensed Milk
// Ghee
