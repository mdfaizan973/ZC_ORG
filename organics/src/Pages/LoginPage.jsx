import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl2 } from "../../config/confg";
import { hasToken, postData } from "../utils/utils";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [islogin, setIslogin] = useState(false);
  const navigate = useNavigate();

  // const handleLoginn = () => {
  //   if (email === "" || pass === "") {
  //     toast.error("Please enter both email and password", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     return;
  //   } else if (email === "admin123@admin.com" && pass === "1234pass") {
  //     toast.success("Admin LogIn SuccessFul!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     sessionStorage.setItem("user_loged_in", "true");
  //     sessionStorage.setItem("isOrganicAdmin", "true");
  //     setTimeout(() => {
  //       // navigate("/admin-portal");
  //       navigate("/");
  //     }, 1200);
  //   } else {
  //     axios
  //       .get(`${baseUrl}/users?email=${email}&pass=${pass}`)
  //       .then((res) => {
  //         if (res.data.length > 0) {
  //           toast.success("LogIn SuccessFul!", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //           sessionStorage.setItem("user_loged_in", "true");
  //           sessionStorage.setItem("isOrganicAdmin", "false");

  //           setTimeout(() => {
  //             navigate("/");
  //           }, 1200);
  //         } else {
  //           toast.error("Login failed. Please check your email and password.", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("An error occurred while logging in. Please try again.", {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       });
  //   }
  // };
  // For Private Route
  useEffect(() => {
    let isUserLogin = hasToken();
    if (isUserLogin) {
      setIslogin(true);
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("OranicSessionStorge");
    setIslogin(false);
    toast.error("Logout Successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
    window.location.reload();
  };

  const handleLogin = async () => {
    const updatedUserData = {
      email: email,
      pass: pass,
    };

    if (email === "" || pass === "") {
      toast.error("Please enter both email and password", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      const user_data = await postData(
        `${baseUrl2}/users/login`,
        updatedUserData
      );

      if (
        user_data?.userDetails &&
        Object.keys(user_data.userDetails).length > 0
      ) {
        sessionStorage.setItem(
          "OranicSessionStorge",
          JSON.stringify(user_data.userDetails)
        );
        setTimeout(() => {
          navigate("/");
        }, 1200);

        toast.success(`${user_data?.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.info(`${user_data?.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {islogin ? (
        <button
          onClick={handleLogOut}
          className="bg-red-500 mt-2 ml-5 z-50 fixed flex items-center text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout <BiExit />
        </button>
      ) : (
        ""
      )}
      {/* BG Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-emerald-500 transform -skew-y-6 translate-y-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-emerald-500 transform skew-y-6 translate-y-10"></div>
      </div>

      <div className=" w-full h-screen flex items-center  justify-center">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-green-600 to-green-400 bg-clip-border text-white shadow-lg shadow-green-500/40">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Sign In
            </h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Enter Email
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                onChange={(e) => setPass(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Enter Password
              </label>
            </div>
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                    id="checkbox"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="checkbox"
                >
                  Remember Me
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              onClick={handleLogin}
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Sign In
            </button>
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Dont have an account?
              <RouterLink to="/register">
                <a
                  href="#signup"
                  className="ml-1 block font-sans text-sm font-bold leading-normal text-green-500 antialiased"
                >
                  Sign up
                </a>
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
