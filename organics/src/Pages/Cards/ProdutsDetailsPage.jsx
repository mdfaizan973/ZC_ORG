"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import {
  FaLeaf,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaSnowflake,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { baseUrl2 } from "../../../config/confg";
import { fetchData, getSessionData, postData } from "../../utils/utils";
import ProductFeedbackAndQuestions, {
  cardClass,
} from "./ProductFeedbackAndQuestions";
import Loader from "../LoadingUI/Loader";
import DiscriptionPageLoader from "../LoadingUI/DiscriptionLoad";

// const products = {
//   _id: "67c41e3d08ab0e184e31e163",
//   category: "dairy",
//   title: "Organic Cow Milk",
//   description: "Fresh organic cow milk sourced from grass-fed cows.",
//   image: "",
//   price_inr: 60,
//   discount_price_inr: 50,
//   discount_percentage: 16,
//   ETA: "1-3 business days",
//   health_benefits_rich_in_vitamins_and_antioxidants: true,
//   health_benefits_improves_immunity: true,
//   health_benefits_enhances_skin_health: true,
//   certified_organic: true,
//   organic_certification_body: "USDA Organic",
//   sustainability: "Ethically sourced from free-range cows.",
//   pesticide_free: true,
//   non_GMO: true,
//   fair_trade_certified: true,
//   gluten_free: true,
//   vegan: false,
//   raw: false,
//   local_source: true,
//   organic_ingredients: ["milk"],
//   harvested_by_hand: false,
//   cruelty_free: true,
//   expiration_date: "2024-07-10",
//   storage_instructions: "Keep refrigerated below 4°C.",
//   saler_email: "faizan9735@gmail.com",
//   saler_id: "67c34c6700514eb3d60b7993",
//   saler_name: "Md Faizan",
//   createdAt: "2025-03-02T09:00:45.213Z",
//   updatedAt: "2025-03-02T09:00:45.213Z",
//   __v: 0,
// };

export default function ProductDetailsPage() {
  const [product, setProduct] = useState({});

  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const { id } = useParams();

  useEffect(() => {
    load_prod_details();
  }, [id]);

  const load_prod_details = async () => {
    setIsLoading(true);
    const data = await fetchData(`${baseUrl2}/products/${id}`);
    setIsLoading(false);
    setProduct(data);
  };

  const handleCart = async (cartData) => {
    const updatedData = {
      ...cartData,
      prodId: cartData._id,
      _id: undefined,
      _v: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      quantity: quantity,
      discount_price_inr: cartData.discount_price_inr * quantity,
      userId: getSessionData("_id"),
      userName: getSessionData("name"),
    };
    await postData(`${baseUrl2}/cart`, updatedData);
  };
  return (
    <>
      <Navbar />

      <div className="bg-white">
        {!isLoading ? (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-green-50 rounded-xl p-6 flex items-center justify-center">
                <img
                  src={
                    product.image ||
                    "https://i.pinimg.com/736x/c0/7b/c4/c07bc4bfd5a7bf373fd5596f13448a0e.jpg"
                  }
                  alt={product.title}
                  width={400}
                  height={400}
                  className="object-contain max-h-[400px]"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 mb-2">
                    {product.category?.toUpperCase()}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-green-600">
                    ₹{product.discount_price_inr}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.price_inr}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                    {product.discount_percentage}% OFF
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <FaCalendarAlt className="text-green-600" />
                  <span>Delivery in {product.ETA}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 text-green-600 hover:bg-green-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 text-green-600 hover:bg-green-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleCart(product)}
                    className="flex items-center justify-center px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>

                  <button
                    className={`p-2 rounded-md border border-green-600 ${
                      isWishlisted ? "bg-green-50" : "bg-white"
                    } transition-colors`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <FaHeart
                      className={
                        isWishlisted ? "text-green-600" : "text-gray-400"
                      }
                    />
                  </button>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Health Benefits */}
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700">
                    <FaShieldAlt /> Health Benefits
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    {product.health_benefits_rich_in_vitamins_and_antioxidants && (
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span>Rich in vitamins and antioxidants</span>
                      </div>
                    )}
                    {product.health_benefits_improves_immunity && (
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span>Improves immunity</span>
                      </div>
                    )}
                    {product.health_benefits_enhances_skin_health && (
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span>Enhances skin health</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Storage Instructions */}
                <div className="flex items-start gap-2">
                  <FaSnowflake className="text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Storage Instructions</h3>
                    <p>{product.storage_instructions}</p>
                    <p className="text-sm text-gray-500">
                      Expires on:{" "}
                      {new Date(product.expiration_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications and Details */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                  <FaLeaf /> Organic Certifications
                </h2>
                <div className="space-y-3">
                  {product.certified_organic && (
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-green-600 text-white">
                        {product.organic_certification_body}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-green-600" />
                    <span>{product.sustainability}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                  <FaInfoCircle /> Product Attributes
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    {product.pesticide_free ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Pesticide Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.non_GMO ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Non-GMO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.gluten_free ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Gluten Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.vegan ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Vegan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.local_source ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Locally Sourced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.cruelty_free ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span>Cruelty Free</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                  <FaHandHoldingHeart /> Seller Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-green-600 text-xl" />
                    <span className="font-medium">{product.saler_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-green-600" />
                    <a
                      href={`mailto:${product.saler_email}`}
                      className="text-green-700 hover:underline"
                    >
                      {product.saler_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-600" />
                    <span className="text-sm">
                      Seller since{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button className="w-full mt-2 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition-colors">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>

            {/* More Details (Expandable) */}
            <div className="mt-12">
              <button
                className="w-full py-2 border border-green-200 text-green-700 rounded-md hover:bg-green-50 flex items-center justify-center gap-2 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More Details"}
                <span
                  className={`transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {isExpanded && (
                <div className={`${cardClass} mt-6`}>
                  <h2 className="text-xl font-semibold text-green-700 mb-4">
                    Complete Product Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h3 className="font-medium text-green-800">
                        Ingredients
                      </h3>
                      <ul className="list-disc list-inside mt-2">
                        {product.organic_ingredients.map(
                          (ingredient, index) => (
                            <li key={index} className="capitalize">
                              {ingredient}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-green-800">Product ID</h3>
                      <p className="text-gray-600 mt-1">{product._id}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-green-800">
                        Last Updated
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {new Date(product.updatedAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-green-800">
                        Additional Attributes
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">Raw:</span>
                          {product.raw ? (
                            <FaCheck className="text-green-600 text-sm" />
                          ) : (
                            <FaTimes className="text-red-500 text-sm" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">Hand Harvested:</span>
                          {product.harvested_by_hand ? (
                            <FaCheck className="text-green-600 text-sm" />
                          ) : (
                            <FaTimes className="text-red-500 text-sm" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">Fair Trade:</span>
                          {product.fair_trade_certified ? (
                            <FaCheck className="text-green-600 text-sm" />
                          ) : (
                            <FaTimes className="text-red-500 text-sm" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <DiscriptionPageLoader />
        )}
      </div>

      {/* FeedBack and Q&A Component */}
      <ProductFeedbackAndQuestions product={product} />
    </>
  );
}
