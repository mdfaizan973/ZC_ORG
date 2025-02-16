// import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DiscriptionLoad from "./LoadingUI/DiscriptionLoad";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/confg";
export default function SingleProducts() {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const getSingleData = (id) => {
    setLoad(true);
    axios
      .get(`${baseUrl}/orgproducts/${id}`)
      .then((res) => {
        setLoad(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSingleData(id);
  }, [id]);

  const addToCart = () => {
    // get for cart
    toast.success("Item Added To Cart", {
      position: toast.POSITION.TOP_CENTER,
    });
    axios
      .get(`${baseUrl}/orgproducts/${id}`)
      .then((res) => {
        console.warn(res.data);
        axios
          .post(`${baseUrl}/cartdata`, res.data)
          .then((res) => {
            console.warn(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {load ? (
        <DiscriptionLoad />
      ) : (
        <section className="flex justify-center items-start  min-h-screen ">
          <div className="mx-auto mt-24 max-w-screen-xl w-full rounded-md border border-gray-100 text-gray-600 shadow-lg bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="flex items-center justify-center p-4 md:w-1/3">
                <img
                  className="block w-full max-h-[400px] object-cover rounded-md"
                  src={data.image}
                  alt="Shop image"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 md:w-2/3">
                {/* Title & Category */}
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <h2 className="text-2xl font-bold">{data.title}</h2>
                  <span className="ml-2 text-sm uppercase text-gray-500">
                    {data.category}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-md leading-relaxed">
                  {data.description}...
                </p>

                {/* Price Section */}
                <div className="flex items-center mt-6">
                  <p className="text-4xl font-extrabold text-green-600">
                    ₹ {data.discount_price_inr}
                  </p>
                  <span className="ml-3 text-sm line-through text-gray-400">
                    ₹{data.price_inr}
                  </span>
                  <span className="ml-2 text-sm font-bold text-red-500">
                    %{data.discount_percentage}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row">
                  <button
                    onClick={addToCart}
                    className="mr-2 mb-4 flex items-center justify-center rounded-md bg-emerald-500 py-2 px-6 text-white text-lg font-medium shadow-md transition hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>{" "}
                    Add To Cart
                  </button>
                  <button className="mr-2 mb-4 flex items-center justify-center rounded-md border py-2 px-6 text-lg font-medium text-gray-600 transition hover:bg-yellow-400 hover:text-white">
                    ⚡ Buy Now
                  </button>
                </div>

                {/* Benefits Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.health_benefits_rich_in_vitamins_and_antioxidants ? (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-md">
                        ✅ Rich in Vitamins
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-md">
                        ❌ Lacks Vitamins
                      </span>
                    )}
                    {data.health_benefits_improves_immunity ? (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-md">
                        ✅ Boosts Immunity
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-md">
                        ❌ No Immunity Boost
                      </span>
                    )}
                    {data.health_benefits_enhances_skin_health ? (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-md">
                        ✅ Improves Skin Health
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-md">
                        ❌ No Skin Benefits
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
// Vital Nutrients - health_benefits_rich_in_vitamins_and_antioxidants
// Immunity Empowering - health_benefits_improves_immunity
// Skin Beautification - health_benefits_enhances_skin_health
