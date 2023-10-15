// import React from "react";

export default function OrgPro() {
  return (
    <div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <div className="bg-white w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img
              src="https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="h-60 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <span className="text-red-400 mr-3 text-xs">Rate</span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                Name
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  100 ₹
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
      </div>
    </div>
  );
}
