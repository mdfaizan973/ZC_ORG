// import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSessionData, postData } from "../../utils/utils";
import { prepare_wishlist } from "../../utils/uiUtils";
import { baseUrl2 } from "../../../config/confg";

export default function OrgPro(props) {
  const { image, price, title, addtocart, id, dataItem } = props;
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
        <RouterLink to={`/productdiscription/${id}`}>
          <img
            src={image || "https://placehold.co/600x400"}
            // src="https://i.pinimg.com/564x/6d/1c/fa/6d1cfa4e1a5e58d31cc935fad125e046.jpg"
            alt=""
            className="h-60 w-72 object-cover rounded-t-xl"
          />
        </RouterLink>
        <div className="px-4 py-3 w-72">
          {/* <span className="text-red-400 font-bold mr-3 uppercase text-xs">
              View
            </span> */}
          <div className="flex justify-between items-center gap-3">
            {/* Details Button */}
            <div className="relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-3 font-sans text-xs font-bold uppercase text-white">
              <RouterLink to={`/productdiscription/${id}`}>
                <div>Details</div>
              </RouterLink>
            </div>

            <div>
              <button
                className="text-red-500 hover:text-red-600 text-xl"
                onClick={() => handleWishlist(dataItem)}
              >
                <AiOutlineHeart />
              </button>
              {showWishlist && (
                <div className="absolute whitespace-nowrap bg-red-800 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-md">
                  Added to Wish List!
                </div>
              )}

              <button
                className="text-blue-500 hover:text-blue-600 text-xl ml-2"
                onClick={handleShare}
              >
                <FiShare2 />
              </button>
              {showTooltip && (
                <div className="absolute whitespace-nowrap bg-gray-800 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-md">
                  Link Copied!
                </div>
              )}
            </div>
          </div>
          {/* <span className="text-red-400 mr-3 text-xs">{title}</span> */}
          <p className="text-lg font-bold text-black truncate block capitalize">
            {title}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {price} ₹
            </p>
            <del> </del>
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
                    toast.success("Item Added To Cart", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }}
                  className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-800 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 "
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
