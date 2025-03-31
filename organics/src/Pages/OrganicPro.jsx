import { useState, useEffect } from "react";
// import ProductsCarload from "./LoadingUI/ProductsCarload";
import OrgPro from "./Cards/OrgPro";
// import axios from "axios";
import Navbar from "../Components/Navbar";
import { baseUrl2 } from "../../config/confg";
import { fetchData, getSessionData, postData } from "../utils/utils";
import ProductsCarload from "./LoadingUI/ProductsCarload";
import { FaSearch } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi"; // Heroicons
import { FiBox, FiFilter } from "react-icons/fi"; // Feather Icons
import { BiSortAlt2 } from "react-icons/bi"; // BoxIcons Alternative
import { MdCategory } from "react-icons/md";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
export default function OrganicPro() {
  const [orgData, setOrgData] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const curdatalength = orgData.length;
  const [loadProd, setLoadProd] = useState(true);
  const organicProdRef = useRef([]);

  // Adding to cart

  const addToCart = async (cartData) => {
    // get for cart
    const updatedData = {
      ...cartData,
      prodId: cartData._id,
      _id: undefined,
      _v: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      quantity: 1,
      userId: getSessionData("_id"),
      userName: getSessionData("name"),
    };
    await postData(`${baseUrl2}/cart`, updatedData);
  };

  // Sorting
  if (sort === "price-high") {
    orgData.sort((a, b) => {
      return a.discount_price_inr - b.discount_price_inr;
    });
  } else if (sort === "price-low") {
    orgData.sort((a, b) => {
      return b.discount_price_inr - a.discount_price_inr;
    });
  }

  // console.log(fileter);
  useEffect(() => {
    load_prod_data();
  }, []);

  const load_prod_data = async () => {
    setLoadProd(true);
    const data = await fetchData(`${baseUrl2}/products`);
    setLoadProd(false);
    setOrgData(data);
    organicProdRef.current = data;
  };

  const handleCategoyChange = (cat) => {
    const categoryData = [...organicProdRef.current];
    const data = categoryData.filter((ele) => ele.category === cat);
    if (data.length > 0) {
      setOrgData(data);
    } else {
      setOrgData([]);
    }
  };

  const handleSearch = (val) => {
    const data = [...organicProdRef.current];

    const search = val.toLowerCase();
    const searchData = data.filter((ele) => {
      const title = ele?.title || "";
      const category = ele?.category || "";
      const description = ele?.description || "";

      return (
        title.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search)
      );
    });
    setOrgData(searchData);
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(orgData.length / itemsPerPage);

  // Get current page data
  const currentProducts = orgData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Go to next page
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Go to previous page
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

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
      <div className="max-w-7xl p-2 shadow-sm rounded-lg mt-6 mx-auto">
        <div className="flex flex-col justify-between md:flex-row md:items-end gap-6">
          {/* Category + Sort (1/3 width) */}
          <div className="w-full md:w-1/3 flex flex-col sm:flex-row gap-4">
            {/* Category */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MdCategory className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="relative">
                <select
                  className="w-full h-10 rounded-md border border-gray-300 pl-3 pr-10 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  onChange={(e) => handleCategoyChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy</option>
                  <option value="grains">Grains</option>
                  <option value="nuts & seeds">Nuts & Seeds</option>
                  <option value="herbs & spices">Herbs & Spices</option>
                  <option value="juice">Juice</option>
                  <option value="oils & fats">Oils & Fats</option>
                  <option value="sweeteners">Sweeteners</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiFilter className="h-4 w-4 mr-2" />
                Sort By
              </h3>
              <div className="relative">
                <select
                  className="w-full h-10 rounded-md border border-gray-300 pl-3 pr-10 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort ₹</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search (2/3 width) */}
          <div className="w-full md:w-1/3">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaSearch className="h-4 w-4 mr-2" />
              Search
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name, Categories..."
                className="pl-10 w-full h-12 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Passing props */}

      {loadProd ? (
        <ProductsCarload />
      ) : orgData?.length <= 0 ? (
        <EmptyData />
      ) : (
        <div className="w-fit mx-auto p-1 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {currentProducts?.map((ele, i) => (
            <OrgPro
              key={i}
              title={ele.title}
              image={ele.image}
              category={ele.category}
              description={ele.description}
              price={ele.price_inr}
              howmuch={ele.how_much}
              id={ele._id}
              dataItem={ele}
              addtocart={addToCart}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 mb-10">
        <button
          disabled={page == 1}
          onClick={handlePrev}
          className="flex items-center justify-center mr-1 py-2 px-4  h-8 text-sm font-medium text-white bg-green-500 rounded-l hover:bg-green-900 dark:bg-green-500 dark:border-green-700  dark:hover:bg-green-700 "
        >
          <AiOutlineLeft /> Prev
        </button>
        <button className="bg-green-500 border-b text-white font-bold py-2 px-4 rounded-lg">
          Page {page} of {totalPages}
        </button>

        <button
          disabled={curdatalength < 9}
          onClick={handleNext}
          className="flex items-center justify-center ml-1 py-2 px-4  h-8 text-sm font-medium text-white bg-green-500 border-green-700 rounded-r hover:bg-green-900 dark:bg-green-500 dark:border-green-700 dark:text-black-400 dark:hover:bg-green-700 "
        >
          Next <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

const EmptyData = () => {
  return (
    <>
      <div className="w-[95%] md:w-[65%] mx-auto mt-10">
        <div className="border border-dashed border-gray-300 rounded-lg py-12 flex flex-col items-center justify-center bg-white">
          <FiBox className="text-gray-400 text-5xl mb-4" />
          <p className="text-gray-500 text-base font-medium">
            No Results Found
          </p>
        </div>
      </div>
    </>
  );
};
