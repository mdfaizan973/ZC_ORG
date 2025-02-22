// import React from 'react'
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute({ component: Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    let userLogin = sessionStorage.getItem("user_loged_in");
    if (!userLogin) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
}

export function AdminProtectedRoute({ component: Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    let isAdmin = sessionStorage.getItem("isOrganicAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

AdminProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
