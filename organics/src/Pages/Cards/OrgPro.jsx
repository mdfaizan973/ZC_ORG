// import React from "react";
import PropTypes from "prop-types";
export default function OrgPro(props) {
  const { title } = props;
  // image , price ,title
  return (
    <div>
      {/* <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"> */}
      <div className="bg-white w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <img
            // src={image}
            src="https://i.pinimg.com/564x/6d/1c/fa/6d1cfa4e1a5e58d31cc935fad125e046.jpg"
            alt=""
            className="h-60 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            {/* <span className="text-red-400 font-bold mr-3 uppercase text-xs">
              View
            </span> */}
            <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-1 px-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
              <div className="mt-px">View</div>
            </div>
            <span className="text-red-400 mr-3 text-xs">{title}</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              Title
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                50 ₹
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
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      {/* </div> */}
    </div>
  );
}
OrgPro.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
