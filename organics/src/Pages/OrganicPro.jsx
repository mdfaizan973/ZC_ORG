import { useState, useEffect } from "react";
import ProductsCarload from "./LoadingUI/ProductsCarload";
import OrgPro from "./Cards/OrgPro";
import axios from "axios";
import Navbar from "../Components/Navbar";
export default function OrganicPro() {
  const [orgData, setOrgData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [sort, setSort] = useState("");
  const [fileter, setFilter] = useState("");
  const curdatalength = orgData.length;
  let limit = 9;
  const getData = (page, filter) => {
    setLoad(true);

    const categoryParam = filter ? `category=${filter}` : "";
    const url = `http://localhost:3030/orgproducts?${categoryParam}&_limit=${limit}&_page=${page}`;

    axios
      .get(url)
      .then((res) => {
        setLoad(false);
        setOrgData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // {Pagination function}
  const handleprev = () => {
    setPage(page - 1);
  };
  const handlenext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getData(page, fileter);
  }, [page, fileter]);

  // Adding to cart

  const addToCart = (id) => {
    // get for cart
    axios
      .get(`http://localhost:3030/orgproducts/${id}`)
      .then((res) => {
        // console.warn(res.data);
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

  // Sorting
  if (sort === "hightolow") {
    orgData.sort((a, b) => {
      return a.discount_price_inr - b.discount_price_inr;
    });
  } else if (sort === "lowtohigh") {
    orgData.sort((a, b) => {
      return b.discount_price_inr - a.discount_price_inr;
    });
  }

  console.log(fileter);

  return (
    <div>
      <Navbar />

      <div className="mt-1 flex justify-center items-center cursor-pointer shadow-lg shadow-grey-800">
        <img
          src="https://www.omfoods.com/cdn/shop/files/OMFOODS_ORGANIC_INGREDIENTS.jpg?v=1681412891"
          alt="Healthy Food Banner"
          className=""
        />
      </div>

      {/* Filter  */}

      <div className="w-[65%] mt-5 mx-auto  flex ">
        <div className="flex w-full sm:w-[30%]">
          <select
            onChange={(e) => setFilter(e.target.value)}
            id="countries"
            className="bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Filter</option>
            <option value="fruits">Fruites</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="grains">Grains</option>
          </select>
          <select
            onChange={(e) => setSort(e.target.value)}
            id="countries"
            className="bg-white-50 border border-white-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Sort ₹</option>
            <option value="hightolow">
              {/* <button onClick={handlehTol}>High to Low</button> */}
              High to Low
            </option>
            <option value="lowtohigh">
              {/* <button onClick={handlelToh}>Low to High</button> */}
              Low to High
            </option>
          </select>
        </div>
      </div>

      {/* Passing props */}

      {load ? (
        <ProductsCarload />
      ) : (
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {orgData.map((ele, i) => (
            <OrgPro
              key={i}
              title={ele.title}
              image={ele.image}
              price={ele.discount_price_inr}
              id={ele.id}
              addtocart={addToCart}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="flex flex-col items-center mt-10 mb-10">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            disabled={page == 1}
            onClick={handleprev}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-500 rounded-l hover:bg-green-900 dark:bg-green-500 dark:border-green-700  dark:hover:bg-green-700 "
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full">
            {page}
          </button>

          <button
            disabled={curdatalength < 9}
            onClick={handlenext}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-500 border-0 border-l border-green-700 rounded-r hover:bg-green-900 dark:bg-green-500 dark:border-green-700 dark:text-black-400 dark:hover:bg-green-700 "
          >
            Next
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
