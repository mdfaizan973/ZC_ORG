import axios from "axios";
import { toast } from "react-toastify";

export const fetchData = async (url, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    let errorMessage =
      "Oops! Something went wrong. Sorry for the turbulence! 💨";

    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });

    throw error;
  }
};

// export const postData = async (url, data, token = null) => {
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     };

//     const response = await axios.post(url, data, { headers });

//     return response.data;
//   } catch (error) {
//     console.error("Error posting data:", error);

//     let errorMessage = "Oops! Something went wrong while sending data. 🚀";

//     toast.error(errorMessage, {
//       position: toast.POSITION.TOP_CENTER,
//     });

//     throw error;
//   }
// };

export const postData = async (url, data, token = null) => {
  const toastId = toast.loading("We are prossing... 🚀", {
    position: toast.POSITION.TOP_CENTER,
  });

  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios.post(url, data, { headers });

    toast.dismiss(toastId); // Remove the loading toast on success
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);

    let errorMessage = "Oops! Something went wrong while sending data. 🚀";

    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });

    throw error;
  } finally {
    toast.dismiss(toastId); // Ensure loader disappears even on error
  }
};
