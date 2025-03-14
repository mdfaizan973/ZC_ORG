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

export const postData = async (url, data, method = "POST", token = null) => {
  const toastId = toast.loading("We are processing... 🚀", {
    position: toast.POSITION.TOP_CENTER,
  });

  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      method, // Can be "POST" or "PUT"
      url,
      data,
      headers,
    });
    toast.success(response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    });
    toast.dismiss(toastId); // Remove loading toast on success
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);

    let errorMessage = "Oops! Something went wrong.🚀";
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });

    throw error;
  } finally {
    toast.dismiss(toastId); // Ensure loader disappears even on error
  }
};

export const deleteData = async (url, token = null) => {
  const toastId = toast.loading("Removing... ⏳", {
    position: toast.POSITION.TOP_CENTER,
  });

  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios.delete(url, { headers });

    toast.dismiss(toastId); // Remove the loading toast on success
    toast.success(response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);

    toast.dismiss(toastId);
    let errorMessage = "Oops! Something went wrong.🚀";
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });

    throw error;
  }
};

export const postDataa = async (url, data, token = null) => {
  const toastId = toast.loading("We are processing... 🚀", {
    position: toast.POSITION.TOP_CENTER,
  });

  console.log("Data being sent:", data);

  if (!data || Object.keys(data).length === 0) {
    toast.dismiss(toastId);
    toast.error("No data provided for the request!", {
      position: toast.POSITION.TOP_CENTER,
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
      position: toast.POSITION.TOP_CENTER,
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
