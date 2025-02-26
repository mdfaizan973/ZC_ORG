// import React from 'react'
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionData, hasToken } from "../utils/utils";
import PageNotFound from "./PageNotFound";
export default function ProtectedRoute({ component: Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    let isUserLogin = hasToken();

    if (!isUserLogin) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
}

// export function AdminProtectedRoute({ component: Component }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isUserLogin = hasToken();

//     if (!isUserLogin) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return <Component />;
// }
export function AdminProtectedRoute({ component: Component }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isUserLogin = hasToken();
    let roleId = getSessionData("role_id");

    if (isUserLogin && [1, 2].includes(roleId)) {
      setIsAuthorized(true);
    }
    // else {
    //   navigate("/login");
    // }
  }, [navigate]);

  return isAuthorized ? <Component /> : <PageNotFound />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

AdminProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
