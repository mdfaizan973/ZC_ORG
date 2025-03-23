// import { useState } from "react";

import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { fetchData, postData } from "./utils/utils";
import { baseUrl2 } from "../config/confg";

function App() {
  // App.js or Layout.jsx
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const latestOrders = await fetchData(`${baseUrl2}/orders`);

        await Promise.all(
          latestOrders.map(async (order) => {
            let updatedData = null;

            if (order.order_status === "Processing") {
              updatedData = { order_status: "Shipped" };
            } else if (order.order_status === "Shipped") {
              updatedData = { order_status: "Delivered" };
            } else if (
              order.order_status === "Delivered" &&
              order.payment_status !== "paid"
            ) {
              updatedData = { payment_status: "paid" };
            }

            if (updatedData) {
              await postData(
                `${baseUrl2}/orders/${order._id}`,
                updatedData,
                "PUT",
                false
              );
            }
          })
        );

        console.log("Orders checked and updated!");
      } catch (error) {
        console.error("Update failed:", error);
      }
    }, 2 * 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;

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
