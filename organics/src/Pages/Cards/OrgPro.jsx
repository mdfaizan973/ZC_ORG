// import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasToken, postData } from "../../utils/utils";
import { placeHolderImage, prepare_wishlist } from "../../utils/uiUtils";
import { baseUrl2, imageUrl } from "../../../config/confg";

export default function OrgPro(props) {
  const {
    image,
    category,
    description,
    discount_price_inr,
    price,
    title,
    addtocart,
    id,
    howmuch,
    dataItem,
  } = props;
  // image , price ,title

  const [showTooltip, setShowTooltip] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/productdiscription/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000); // Hide after 2 sec
    });
  };

  const handleWishlist = async (dataItem) => {
    setShowWishlist(true);
    setTimeout(() => setShowWishlist(false), 1000);

    const wl_data = prepare_wishlist(dataItem);
    await postData(`${baseUrl2}/product-wishlist`, wl_data);
  };

  return (
    <div>
      <ToastContainer />
      {/* <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"> */}
      <div className="bg-white w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        {/* <RouterLink to={`/productdiscription/${id}`}>
          <img
            src={`${imageUrl}${image}` || placeHolderImage}
            alt=""
            className="h-60 w-72 object-cover rounded-t-xl"
          />
        </RouterLink> */}
        <div className="relative">
          <RouterLink to={`/productdiscription/${id}`}>
            <img
              src={`${imageUrl}${image}` || placeHolderImage}
              alt={title}
              className="h-60 w-72 object-cover rounded-t-xl"
            />
          </RouterLink>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              className="p-2 rounded-full bg-white shadow-md transition-colors duration-200 hover:bg-red-100"
              onClick={() => handleWishlist(dataItem)}
              disabled={!hasToken()}
            >
              <AiOutlineHeart className={`h-5 w-5 fill-red-500 text-red-500`} />
            </button>
            {showWishlist && (
              <div className="absolute whitespace-nowrap bg-red-800 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-md">
                Added to Wish List!
              </div>
            )}

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white shadow-md transition-colors duration-200 hover:bg-blue-100"
            >
              <FiShare2 className="h-5 w-5 text-blue-500" />
            </button>
            {showTooltip && (
              <div className="absolute whitespace-nowrap bg-gray-800 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-md">
                Link Copied!
              </div>
            )}
          </div>
          <div className="absolute top-2 left-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>

        <div className="px-3 py-3 w-72">
          {/* <span className="text-red-400 mr-3 text-xs">{title}</span> */}
          <div className="flex justify-between items-center gap-3">
            <p className="text-lg font-bold text-black truncate block capitalize">
              {title}
            </p>
            <p className="text-sm text-gray-400 truncate block capitalize">
              {howmuch}
            </p>
          </div>

          <div className="text-sm">{description.substring(0, 50)}...</div>

          <div className="flex items-center -mt-1">
            <p className="text-lg font-semibold text-black cursor-auto">
              {discount_price_inr} ₹
              <span className="text-gray-500 line-through text-sm ml-2">
                {price} ₹
              </span>
            </p>

            {/* <del> </del> */}
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              ></svg>

              <div className="ml-auto">
                <button
                  onClick={() => {
                    addtocart(dataItem);
                  }}
                  disabled={!hasToken()}
                  className={`mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-800 py-2 px-4 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 ${
                    !hasToken() ? "line-through" : ""
                  }`}
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
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
OrgPro.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addtocart: PropTypes.func,
  id: PropTypes.number.isRequired,
};
