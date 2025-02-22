import { useEffect, useState } from "react";

export default function PageNotFound() {
  const [isOrgAdmin, setIsOrgAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isOrganicAdmin");
    setIsOrgAdmin(isAdmin === "true");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 text-center px-4">
      <img
        src="https://i.pinimg.com/736x/6e/38/b4/6e38b432924cc05c56d396b65235688e.jpg"
        alt="Page Not Found"
        className="w-80 max-w-full mb-4"
      />

      {isOrgAdmin ? (
        <>
          <p className="text-lg font-medium">
            If you are trying to access the{" "}
            <span className="font-semibold text-blue-500">Admin Panel</span>,
            press <span className="font-semibold">Ctrl + Shift + R</span> or
            click the button below to refresh.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Refresh Page 🔄
          </button>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-extrabold">404 - Page Not Found</h1>
          <p className="mt-4 text-lg font-medium">
            Oops! This page doesn&apos;t exist.
          </p>
        </>
      )}
    </div>
  );
}
