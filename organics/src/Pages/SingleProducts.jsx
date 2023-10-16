// import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DiscriptionLoad from "./LoadingUI/DiscriptionLoad";
export default function SingleProducts() {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const getSingleData = (id) => {
    setLoad(true);
    axios
      .get(`http://localhost:3030/orgproducts/${id}`)
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
    axios
      .get(`http://localhost:3030/orgproducts/${id}`)
      .then((res) => {
        console.warn(res.data);
        axios
          .post(`http://localhost:3030/cartdata`, res.data)
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
      {load ? (
        <DiscriptionLoad />
      ) : (
        <section className="w-screen">
          <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md">
            <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
              <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
                <img
                  className="block h-[100%] max-w-full rounded-md "
                  // src="https://i.pinimg.com/564x/5f/23/52/5f2352717a7be25e2e0ec4d309edacaa.jpg"
                  src={data.image}
                  alt="Shop image"
                />
              </div>
              <div className="relative p-8 md:w-4/6">
                <div className="flex flex-col md:flex-row">
                  <h2 className="mb-2 text-2xl font-black">{data.title}</h2>
                  <span className="ml-2 text-xs uppercase">
                    {data.category}
                  </span>
                </div>
                <p className="mt-3 font-sans text-md tracking-normal">
                  {data.description}.....
                </p>
                <div className="flex flex-col md:flex-row md:items-end">
                  <p className="mt-6 text-4xl font-black">
                    ₹ {data.discount_price_inr}
                  </p>
                  <span className="ml-2 text-sm uppercase line-through">
                    ₹{data.price_inr}
                  </span>{" "}
                  <span className="ml-2 text-sm uppercase ">
                    %{data.discount_percentage}
                  </span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row">
                  <button
                    onClick={addToCart}
                    className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500"
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
                    </svg>
                    Add To Cart
                  </button>
                  <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-yellow-300 hover:text-white">
                    Buy now
                  </button>
                </div>
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-teal-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                  Benifits
                </div>
                <br />
                {data.health_benefits_rich_in_vitamins_and_antioxidants ? (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px">✅</div>
                  </div>
                ) : (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px px-1">X</div>
                  </div>
                )}
                -
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-1 align-baseline font-sans text-[10px] font-bold uppercase leading-none text-white">
                  <div className="mt-px">Vital Nutrients</div>
                </div>
                <br />
                <br />
                {data.health_benefits_improves_immunity ? (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px">✅</div>
                  </div>
                ) : (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px px-1">X</div>
                  </div>
                )}
                -
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-1 align-baseline font-sans text-[10px]  font-bold uppercase leading-none text-white">
                  <div className="mt-px"> Immunity Empowering</div>
                </div>
                <br />
                <br />
                {data.health_benefits_enhances_skin_health ? (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px">✅</div>
                  </div>
                ) : (
                  <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-1 px-1 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mt-px px-1">X</div>
                  </div>
                )}
                -
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-1 align-baseline font-sans text-[10px]  font-bold uppercase leading-none text-white">
                  <div className="mt-px"> Skin Beautification</div>
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
