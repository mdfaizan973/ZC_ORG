import { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ChakOutPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [exD, setExD] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const obj = {
    cardNumber,
    exD,
    cvv,
    name,
    email,
    phone,
  };
  const handlepaypal = () => {
    if (
      cardNumber == "" ||
      exD == "" ||
      cvv == "" ||
      phone == "" ||
      name == "" ||
      email == ""
    ) {
      toast.error("Fill all the information!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      redirect();

      axios
        .post(`http://localhost:3030/pporders`, obj)
        .then((res) => {
          console.log(res);
          toast.success("Item Removed!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .cathch((err) => {
          console.log(err);
        });
    }
  };
  const redirect = () => {
    setTimeout(() => {
      console.warn("Hello");
      navigate("/delivery");
    }, 2000);
  };
  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          <div>
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
              <img
                className="rounded-t shadow-lg"
                src="https://www.omfoods.com/cdn/shop/files/SALE_PRODUCTS_OM_FOODS.jpg?v=1681412890"
                width="460"
                height="180"
                alt="Pay background"
              />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
              <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <img
                      className="-mt-8 inline-flex rounded-full"
                      src="https://naturelandorganics.com/cdn/shop/files/xclusive.png?v=1654978150"
                      width="64"
                      height="64"
                      alt="User"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative flex w-full p-1 bg-gray-50 rounded">
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none >Pay With Card</button>
                            <button className="
                    >
                      Pay With PayPal
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative flex w-full p-1 bg-gray-50 rounded">
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none >Pay With Card</button>
                            <button className="
                    >
                      Cash On Delivery
                    </button>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name on Card Holder{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-nr"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="John Doe"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Card Number
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-name"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="number"
                        required
                        placeholder="1234 1234 1234 1234"
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-email"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="email"
                        placeholder="john@company.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-phone"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="number"
                        placeholder="1234567890"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-expiry"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="number"
                          required
                          placeholder="MM/YY"
                          onChange={(e) => setExD(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-cvc"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="number"
                          required
                          placeholder="CVV"
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="mb-4">
                      <button
                        onClick={handlepaypal}
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                      >
                        Pay $253.00
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Make Successful payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <dialog
        id="my_modal_1"
        className="modal bg-transparent w-fit p-3 rounded-xl"
      >
        <section className="antialiased  text-gray-600 min-h-[screen] ">
          <div className="h-full">
            <div>
              <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
                <img
                  className="rounded-t shadow-lg"
                  src="https://www.omfoods.com/cdn/shop/files/OMFOODS_ORGANIC.jpg?v=1681412890"
                  width="460"
                  height="180"
                  alt="Pay background"
                />
              </div>
              <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
                <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                  <div className="text-center mb-6">
                    <div className="mb-2">
                      <img
                        className="-mt-8 inline-flex rounded-full"
                        src="https://naturelandorganics.com/cdn/shop/files/xclusive.png?v=1654978150"
                        width="64"
                        height="64"
                        alt="User"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="relative flex w-full p-1 bg-gray-50 rounded">
                      <button
                        className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none >Pay With Card</button>
                            <button className="
                      >
                        Cash On Delivery
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Name
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="card-nr"
                            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                            type="text"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="card-phone"
                            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                            type="number"
                            placeholder="1234567890"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-email"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="email"
                          placeholder="john@company.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-phone"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="text"
                          placeholder="India.."
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="mb-4">
                        <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                          Pay $253.00
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 italic text-center">
                        Make Successful payment
                      </div>
                      <form method="dialog">
                        <button className="btn btn-sm text-red-500 btn-circle btn-ghost ">
                          ✕
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </dialog>
    </>
  );
}
