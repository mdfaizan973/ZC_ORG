"use client";

import { useState, useEffect } from "react";
import { FaCopy, FaEye } from "react-icons/fa";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiShoppingBag,
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { baseUrl2 } from "../../../config/confg";
import { useNavigate } from "react-router-dom";
import Loader from "../../Pages/LoadingUI/Loader";
export default function AdminProductsTable({
  products,
  handleEditProduts,
  handleDaleteData,
  handleAddProducts,
  openModal,
  prodLoading,
}) {
  // Sample product data

  // State for search, pagination, sorting, and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itemsPerPage = 10;

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(["All", ...uniqueCategories]);
  }, [products]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.saler_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === "price") {
        comparison = a.price_inr - b.price_inr;
      } else if (sortField === "createdAt") {
        comparison =
          new Date(a.product_create_date) - new Date(b.product_create_date);
      } else {
        comparison = a[sortField]?.localeCompare(b[sortField]);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle delete product
  const handleDelete = (product) => {
    handleDaleteData(product);
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <FiArrowUp className="inline ml-1" />
    ) : (
      <FiArrowDown className="inline ml-1" />
    );
  };
  const navigate = useNavigate();

  const handleEdit = (product) => {
    handleEditProduts(product);
    openModal();
  };

  const handleView = (product) => {
    navigate(`/admin-products-view/${product._id}`);
  };

  const handleCopy = (prod) => {
    const newProduct = { ...prod, _id: undefined }; // Remove _id to let MongoDB generate a new one
    handleAddProducts(`${baseUrl2}/products`, newProduct, false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Header with title and search */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FiShoppingBag className="mr-3 text-green-600" />
          <span>Product Inventory</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Search bar */}
          <div
            className={`relative flex-grow max-w-md transition-all duration-300 ${
              isSearchFocused ? "scale-105" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch
                className={`h-5 w-5 transition-colors duration-300 ${
                  isSearchFocused ? "text-green-600" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search products, sellers, categories..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Desktop filters */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-gray-600 flex items-center">
              <FiFilter className="mr-2 text-green-600" /> Filter:
            </span>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filter toggle */}
          <button
            className="md:hidden flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FiFilter className="mr-2 text-green-600" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Mobile filters */}
        {showMobileFilters && (
          <div className="md:hidden mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
        {/* Table header */}
        {prodLoading ? (
          <div className="flex items-center justify-center h-[400px] w-full">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-green-50 text-left">
                  <th
                    className="px-6 py-4 font-semibold text-green-800 cursor-pointer hover:bg-green-100 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      <FiShoppingBag className="mr-2 text-green-600" />
                      Product Name
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 font-semibold text-green-800 cursor-pointer hover:bg-green-100 transition-colors"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2 text-green-600" />
                      Price
                      {getSortIcon("price")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 font-semibold text-green-800 cursor-pointer hover:bg-green-100 transition-colors hidden md:table-cell"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      <FiTag className="mr-2 text-green-600" />
                      Category
                      {getSortIcon("category")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 font-semibold text-green-800 cursor-pointer hover:bg-green-100 transition-colors hidden lg:table-cell"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-green-600" />
                      Created
                      {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 font-semibold text-green-800 cursor-pointer hover:bg-green-100 transition-colors hidden md:table-cell"
                    onClick={() => handleSort("seller")}
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-green-600" />
                      Seller
                      {getSortIcon("seller")}
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-green-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <>
                      <tr
                        key={product.id}
                        className={`border-b border-gray-100 transition-all duration-200 ${
                          hoveredRow === product._id
                            ? "bg-green-50"
                            : "hover:bg-gray-50"
                        }`}
                        onMouseEnter={() => setHoveredRow(product._id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">
                            {product.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-green-700">
                            ${product.price_inr.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-gray-600">
                          {formatDate(product.product_create_date)}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                          {product.saler_name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              className="p-2  border border-gray-600 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
                              aria-label="Edit product"
                            >
                              <FaCopy
                                onClick={() => handleCopy(product)}
                                className="h-5 w-5"
                              />
                            </button>
                            <button
                              className="p-2  border border-green-600 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                              aria-label="Edit product"
                            >
                              <FaEye
                                onClick={() => handleView(product)}
                                className="h-5 w-5"
                              />
                            </button>
                            <button
                              className="p-2  border border-blue-600 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                              aria-label="Edit product"
                            >
                              <FiEdit
                                onClick={() => handleEdit(product)}
                                className="h-5 w-5"
                              />
                            </button>
                            <button
                              className="p-2  border border-red-600 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                              onClick={() => handleDelete(product)}
                              aria-label="Delete product"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Mobile View: Additional Fields Inside Table */}
                      <tr className="md:hidden border-b border-gray-100 bg-gray-50">
                        <td
                          colSpan="6"
                          className="px-6 py-2 text-sm text-gray-700"
                        >
                          <div className="flex flex-wrap justify-between">
                            <div>
                              <span className="font-medium">Category:</span>{" "}
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {product.category}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium">Created:</span>{" "}
                              {formatDate(product.createdAt)}
                            </div>
                            <div>
                              <span className="font-medium">Seller:</span>{" "}
                              {product.seller}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No products found. Try a different search term or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>
            <div className="flex gap-1">
              <button
                className={`p-2 rounded-md flex items-center justify-center ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:bg-green-100"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>

              <div className="hidden sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? "bg-green-600 text-white font-medium"
                          : "text-gray-600 hover:bg-green-100"
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <div className="sm:hidden flex items-center">
                <span className="text-gray-600 mx-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <button
                className={`p-2 rounded-md flex items-center justify-center ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:bg-green-100"
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
