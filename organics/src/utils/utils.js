import axios from "axios";
import { toast } from "react-toastify";

export const fetchData = async (url, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    let errorMessage = "Oops! Sorry for the turbulence💨";

    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
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
//       position: toast.POSITION.TOP_RIGHT,
//     });

//     throw error;
//   }
// };

export const postData = async (url, data, method = "POST", token = null) => {
  const toastId = toast.loading("We are processing... 🚀", {
    position: toast.POSITION.TOP_RIGHT,
  });

  try {

    const isForm = data instanceof FormData; // for image file 

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isForm ? {} : { "Content-Type": "application/json" }),
    };

    const response = await axios({
      method, // Can be "POST" or "PUT"
      url,
      data,
      headers,
    });
    toast.success(response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    toast.dismiss(toastId); // Remove loading toast on success
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);

    let errorMessage = "Oops! Sorry for the turbulence.🚀";
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });

    throw error;
  } finally {
    toast.dismiss(toastId); // Ensure loader disappears even on error
  }
};

export const deleteData = async (
  url,
  showNotification = true,
  token = null
) => {
  let toastId = null;

  if (showNotification) {
    toastId = toast.loading("Removing... ⏳", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios.delete(url, { headers });

    if (showNotification) {
      toast.dismiss(toastId);
      toast.success(response?.data?.message || "Deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);

    if (showNotification) {
      toast.dismiss(toastId);
      toast.error("Oops! Sorry for the turbulence.🚀", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }

    throw error;
  }
};

export const postDataa = async (url, data, token = null) => {
  const toastId = toast.loading("We are processing... 🚀", {
    position: toast.POSITION.TOP_RIGHT,
  });

  console.log("Data being sent:", data);

  if (!data || Object.keys(data).length === 0) {
    toast.dismiss(toastId);
    toast.error("No data provided for the request!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }

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

    let errorMessage = "Oops! Something went wrong.🚀";

    if (error.response?.status === 401) {
      errorMessage =
        "Invalid credentials. Please check your email and password.";
    } else if (error.response?.status === 404) {
      errorMessage = "User not found. Please check your email.";
    }

    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });

    throw error;
  } finally {
    toast.dismiss(toastId); // Ensure loader disappears even on error
  }
};

export const getSessionData = (key) => {
  try {
    const data = sessionStorage.getItem("OranicSessionStorge");
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData[key] ?? null; // Return the value or null if key doesn't exist
    }
    return null;
  } catch (error) {
    console.error("Error retrieving session data:", error);
    return null;
  }
};

export const hasToken = () => {
  try {
    const data = sessionStorage.getItem("OranicSessionStorge");
    if (data) {
      const parsedData = JSON.parse(data);
      return !!parsedData.token; // Return true if token exists, false otherwise
    }
    return false;
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
};
