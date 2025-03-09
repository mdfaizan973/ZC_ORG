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
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import AdminNav from "./AdminNav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "./AdminAnalytics";
import { baseUrl2 } from "../../config/confg";

const product = {
  _id: "67c41e3d08ab0e184e31e163",
  category: "dairy",
  title: "Organic Cow Milk",
  description: "Fresh organic cow milk sourced from grass-fed cows.",
  image: "",
  price_inr: 60,
  discount_price_inr: 50,
  discount_percentage: 16,
  ETA: "1-3 business days",
  health_benefits_rich_in_vitamins_and_antioxidants: true,
  health_benefits_improves_immunity: true,
  health_benefits_enhances_skin_health: true,
  certified_organic: true,
  organic_certification_body: "USDA Organic",
  sustainability: "Ethically sourced from free-range cows.",
  pesticide_free: true,
  non_GMO: true,
  fair_trade_certified: true,
  gluten_free: true,
  vegan: false,
  raw: false,
  local_source: true,
  organic_ingredients: ["milk"],
  harvested_by_hand: false,
  cruelty_free: true,
  expiration_date: "2024-07-10",
  storage_instructions: "Keep refrigerated below 4°C.",
  saler_email: "faizan9735@gmail.com",
  saler_id: "67c34c6700514eb3d60b7993",
  saler_name: "Md Faizan",
  createdAt: "2025-03-02T09:00:45.213Z",
  updatedAt: "2025-03-02T09:00:45.213Z",
  __v: 0,
};

export default function AdminProductView() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [singleData, setSingleData] = useState({});

  // Admin functions (to be implemented)
  const handleEditProduct = () => {
    console.log("Edit product:", product._id);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteProduct = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product:", product._id);
      // Delete product logic
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    loadProducts();
  }, [id]);

  const loadProducts = async () => {
    const data = await fetchData(`${baseUrl2}/products/${id}`);
    if (data) {
      setSingleData(data);
    }
  };
  return (
    <>
      <AdminNav />
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Admin Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleGoBack}
                className="p-2 rounded-full hover:bg-green-50 text-green-700"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Product Details
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditProduct}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Product ID and Status */}
          <div className="bg-gray-50 p-3 rounded-md mb-6 flex flex-wrap justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Product ID:</span>{" "}
              {singleData._id}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Last Updated:</span>{" "}
              {new Date(singleData.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            {/* bg-green-50 */}
            <div className="border rounded-xl p-6 flex items-center justify-center">
              <img
                src={
                  singleData.image ||
                  "https://i.pinimg.com/736x/dc/cc/a2/dccca27d07678f10b1493b95d9bbeb99.jpg"
                }
                alt={singleData.title}
                width={400}
                height={400}
                className="object-contain max-h-[400px] rounded-xl"
              />
            </div>

            {/* Product Basic Info */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {singleData?.category?.toUpperCase()}
                  </span>
                  {singleData.certified_organic && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                      {singleData.organic_certification_body}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {singleData.title}
                </h1>
                <p className="text-gray-600 mt-2">{singleData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <div className="text-sm text-gray-500">Regular Price</div>
                  <div className="text-xl font-semibold">
                    ₹{singleData.price_inr}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Discount Price</div>
                  <div className="text-xl font-semibold text-green-600">
                    ₹{singleData.discount_price_inr}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Discount</div>
                  <div className="text-xl font-semibold">
                    {singleData.discount_percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Delivery Estimate</div>
                  <div className="text-xl font-semibold">{singleData.ETA}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Storage Instructions */}
              <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg">
                <FaSnowflake className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Storage Instructions</h3>
                  <p>{singleData.storage_instructions}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Expires on:</span>{" "}
                    {new Date(singleData.expiration_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Benefits */}
            <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                <FaShieldAlt /> Health Benefits
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {singleData.health_benefits_rich_in_vitamins_and_antioxidants ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                  <span>Rich in vitamins and antioxidants</span>
                </div>
                <div className="flex items-center gap-2">
                  {singleData.health_benefits_improves_immunity ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                  <span>Improves immunity</span>
                </div>
                <div className="flex items-center gap-2">
                  {singleData.health_benefits_enhances_skin_health ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                  <span>Enhances skin health</span>
                </div>
              </div>
            </div>

            {/* Organic Certifications */}
            <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                <FaLeaf /> Organic Certifications
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Certified Organic:</span>
                  {singleData.certified_organic ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </div>
                {singleData.certified_organic && (
                  <div>
                    <span className="font-medium">Certification Body:</span>
                    <span className="ml-2">
                      {singleData.organic_certification_body}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Sustainability:</span>
                  <p className="mt-1 text-gray-700">
                    {singleData.sustainability}
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="p-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-4">
                <FaHandHoldingHeart /> Seller Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-green-600 text-xl" />
                  <span className="font-medium">{singleData.saler_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-green-600" />
                  <a
                    href={`mailto:${singleData.saler_email}`}
                    className="text-green-700 hover:underline"
                  >
                    {singleData.saler_email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  <span className="text-sm">
                    Seller since{" "}
                    {new Date(singleData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-medium">Seller ID:</span>
                  <p className="text-sm text-gray-500 mt-1">
                    {singleData.saler_id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Attributes */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-6">
              <FaInfoCircle /> Product Attributes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Pesticide Free:</span>
                {singleData.pesticide_free ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Non-GMO:</span>
                {singleData.non_GMO ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Gluten Free:</span>
                {singleData.gluten_free ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Vegan:</span>
                {singleData.vegan ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Locally Sourced:</span>
                {singleData.local_source ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Cruelty Free:</span>
                {singleData.cruelty_free ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Raw:</span>
                {singleData.raw ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Hand Harvested:</span>
                {singleData.harvested_by_hand ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Fair Trade:</span>
                {singleData.fair_trade_certified ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside">
              {singleData?.organic_ingredients?.map((ingredient, index) => (
                <li key={index} className="capitalize">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
