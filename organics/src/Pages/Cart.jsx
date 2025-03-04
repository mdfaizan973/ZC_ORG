import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./LoadingUI/CartLoading";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/confg";
export default function Cart() {
  const [cartdata, setCartData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    axios
      .get(`${baseUrl}/cartdata`)
      .then((res) => {
        // console.log(res);
        setLoad(false);
        setCartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const delefromcart = (itemId) => {
    axios
      .delete(`${baseUrl}/cartdata/${itemId}`)
      .then((res) => {
        console.log(res);
        setCartData(cartdata.filter((item) => item.id !== itemId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalPrice = cartdata.reduce((acc, item) => {
    return acc + item.discount_price_inr;
  }, 0);

  const totalPriceoff = cartdata.reduce((acc, item) => {
    return acc + item.price_inr;
  }, 0);

  // console.log(totalPrice);
  const handlesaveprice = () => {
    const totalPriceString = totalPrice.toString();

    localStorage.setItem("totalPriceorg", totalPriceString);
  };
  return (
    <div>
      <ToastContainer />
      <Navbar />

      {load ? (
        <Loading />
      ) : (
        <div className="">
          <h1 className="mt-5 mb-8 text-center text-3xl text-gray-600 font-bold">
            CART ITEMS
          </h1>
          <div className="mx-auto mb-10 max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartdata.map((ele, i) => (
                <div
                  key={i}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <RouterLink to={`/productdiscription/${ele.id}`}>
                    <img
                      // src="https://www.organictattva.com/wp-content/uploads/2019/08/Amaranth-cutlet.jpg"
                      src={ele.image}
                      alt="product-image"
                      className="cartimage w-32 h-32 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-xl object-cover"
                    />
                  </RouterLink>

                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {ele.title}
                      </h2>
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        {ele.category}
                      </span>
                      <p className="mt-1 text-xs text-gray-700">
                        {ele.description}.....
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100  ">
                          Quantity
                        </span>
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100  ">
                          <div className="flex w-12 flex-col gap-6">
                            <select size="md" label="select Version">
                              <option>1</option>
                              {/* <option> 2</option>
                              <option> 3</option>
                              <option> 4</option>
                              <option> 5</option> */}
                            </select>
                          </div>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm"> ₹ {ele.discount_price_inr} </p>
                        <button
                          onClick={() => {
                            delefromcart(ele.id);
                            toast.success("Item Removed!", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Total Price</p>
                <p className="text-gray-700">₹ {Math.ceil(totalPriceoff)} </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Off Price</p>
                <p className="text-gray-700">₹ {Math.ceil(totalPrice)} </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Pay</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    ₹ {Math.ceil(totalPrice)}
                  </p>
                </div>
              </div>
              <RouterLink to="/checkout">
                <button
                  onClick={handlesaveprice}
                  disabled={cartdata.length <= 0}
                  className="mt-6 w-full rounded-md bg-emerald-600 hover:bg-emerald-800 py-1.5  transition duration-150 ease-in-out hover:translate-y-1 font-medium text-blue-50"
                >
                  <a> Check out </a>
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
