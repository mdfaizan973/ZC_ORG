// import React from 'react'
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let userLogin = sessionStorage.getItem("user_loged_in");
    if (!userLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
